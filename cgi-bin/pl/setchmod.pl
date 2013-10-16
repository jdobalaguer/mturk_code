#!/usr/bin/perl

local ($buffer, @pairs, $pair, $key, $value, %FORM);

print "Content-type: text/html\n\n";


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

# set chmod
$this_path = $FORM{path};
my $safe_mode = 0666;
chmod $safe_mode, $this_path;

