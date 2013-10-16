#!/usr/bin/perl

local ($buffer, @pairs, $pair, $key, $value, %FORM);

print "Content-type: text/html\n\n";

use POSIX qw(strftime);

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

unless (exists $FORM{id}) {
  print LOGFILE $date." : ".$this_task." : error. no path specified\n";
  die "no path specified\n";
}

# save date
my $date = strftime "%Y/%m/%d %Hh%Mm%Ss", localtime;
# save POST variables
$this_task = $FORM{task};
$this_id = $FORM{id};


# write data
open  LOGFILE, '>>'."../../docs/log.txt";
print LOGFILE $date." : ".$this_task." : starting participant '".$this_id."'\n";
close LOGFILE;
