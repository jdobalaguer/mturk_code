#!/usr/bin/perl

use LWP::UserAgent;
use CGI;

local ($buffer, @pairs, $pair, $name, $value, %FORM);

# get POST variables
$ENV{'REQUEST_METHOD'} =~ tr/a-z/A-Z/;
if ($ENV{'REQUEST_METHOD'} eq "POST") {
  read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
} else {
  $buffer = $ENV{'QUERY_STRING'};
}
@pairs = split(/&/, $buffer);
foreach $pair (@pairs) {
  ($name, $value) = split(/=/, $pair);
  $value =~ tr/+/ /;
  $value =~ s/%(..)/pack("C", hex($1))/eg;
  $FORM{$name} = $value;
}

# save POST variables
my $this_resp = $FORM{resp};
my $this_chal = $FORM{chal};
my $this_host = $ENV{'REMOTE_ADDR'};
my $this_pkey = "6Lfnv-cSAAAAALUZqnCNtupVYfqymUtmAGzyNScV";
my %this_data = { 
                  'remoteip'   => $this_host,
                  'privatekey' => $this_pkey,
                  'response'   => $this_resp,
                  'challenge'  => $this_chal };


# request POST
my $this_url = 'http://www.google.com/recaptcha/api/verify';
my $this_ua  = LWP::UserAgent->new();
my $this_req = $this_ua->post(
  $this_url,
  {
    'privatekey' => $this_pkey,
    'remoteip' => $this_host,
    'response' => $this_resp,
    'challenge' => $this_chal
    }
  );
my $this_ok  = $this_req->is_success();
my $this_txt = $this_req->decoded_content();

my $cgi = CGI->new();
print $cgi->header();
my $this_line = (split /\n/,$this_txt)[0];
print $this_line;

# write to file
open  FILE, '>'."../../docs/captcha.txt";
sub println {
    local $\ = "\n";
    print FILE @_;
}
println($this_pkey);
println($this_host);
println($this_resp);
println($this_txt);
close FILE;
