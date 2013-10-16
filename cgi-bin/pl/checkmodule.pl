#!/usr/bin/perl

print "Content-type: text/html\n\n";

sub try_load {
  my $mod = shift;

  eval("use $mod");

  if ($@) {
    #print "\$@ = $@\n";
    return(0);
  } else {
    return(1);
  }
}

sub print_loaded {
  my $module = shift;
  if (try_load($module)) {
    print $module," is installed<br>\n";
  } else {
    print $module," is not installed<br>\n";
  }
}

print_loaded(Captcha::reCAPTCHA);
print_loaded(LWP::UserAgent);
print_loaded(Data::Dumper);
print_loaded(Try::Tiny);