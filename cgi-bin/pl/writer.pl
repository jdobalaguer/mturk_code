#!/usr/bin/perl

local ($buffer, @pairs, $pair, $key, $value, %FORM);

print "Content-type: text/html\n\n";

my $safe_mode = 0660;
open  LOGFILE, '>>'."../../docs/log.txt";
use POSIX qw(strftime);
my $date = strftime "%Y/%m/%d %Hh%Mm%Ss", localtime;

# get POST variables
$ENV{'REQUEST_METHOD'} =~ tr/a-z/A-Z/;
if ($ENV{'REQUEST_METHOD'} eq "POST") {
  read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
} else {
  $buffer = $ENV{'QUERY_STRING'};
}
@pairs = split(/&/, $buffer);
foreach $pair (@pairs) {
  ($key, $value) = split(/=/, $pair);
  $value =~ tr/+/ /;
  $value =~ s/%(..)/pack("C", hex($1))/eg;
  $FORM{$key} = $value;
}

# check
unless (exists $FORM{task}) {
  print LOGFILE $date." : error. no task specified\n";
  die "no task specified\n";
}

unless (exists $FORM{path}) {
  print LOGFILE $date." : ".$this_task." : error. no path specified\n";
  die "no path specified\n";
}

# save POST variables
$this_task = $FORM{task};
$this_path = $FORM{path};
$this_id = $FORM{id};
$this_ownfile = $this_path."/".$this_id.".txt";

# create dir
unless(-e $this_path) {
  if(mkdir $this_path) {
    print LOGFILE $date." : ".$this_task." : path '".$this_path."' created\n";
  } else {
    print LOGFILE $date." : ".$this_task." : error. can't create path '".$this_path."'\n";
    die "can't create path ".$this_path."\n";
  }
  chmod $safe_mode, $this_path;
}

# create files
if(-e $this_ownfile) {
  if(open FILE, '>'.$this_ownfile) {
    print LOGFILE $date." : ".$this_task." : file '".$this_ownfile."' created\n";
  } else {
    print LOGFILE $date." : ".$this_task." : error. can't create file '".$this_ownfile."'\n";
    die "can't create file ".$this_ownfile."\n";
  }
  close FILE;
}

# open file
open OWNFILE, '>>'.$this_ownfile;

# write data
print LOGFILE $date." : ".$this_task." : writing participant '".$this_id."' in '".$this_ownfile."'\n";
@these_fields = keys %FORM;
foreach my $this_field (@these_fields) {
  if(($this_field ne "task") and ($this_field ne "path") and ($this_field ne "id")){
    print OWNFILE $this_field." : ".$FORM{$this_field}."\n";
  }
}

# close file
close OWNFILE;
close LOGFILE;

# set permissions
chmod $safe_mode, $this_ownfile;
