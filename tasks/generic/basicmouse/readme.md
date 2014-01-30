
Take your time to read this all slowly and carefully. Don't read it in diagonal...
I do hope it will be useful for you.



– – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 

DONT CREATE/DELETE/EDIT ANYTHING OUTSIDE OF YOUR OWN FOLDER.
If you want to contribute, put yourself in contact with me (Jan), and I'll merge it with the framework after in its most appropiate place.

– – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 

There are three parent folders: main, sandbox and experimental.
You want to run your experiments in the "main" one. Whenever you are running or debugging your code, you should do that in the "sandbox" one, then copy it to the main folder once it's ready. Ideally, you would never edit your code once it's copy in the main folder.
The "experimental" folder will be used to test new libraries before being copied inside the main or the sandbox folders.

– – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – – 

If you want to create a new experiment:


01 »  Copy the "//sandbox/tasks/generic/basicmouse" folder into your personal folder "//sandbox/tasks/ME/basicmouse" – where "ME" is your name.  If you copy it somewhere else than in personal folder, nothing will work.  So, don't try something like "//sandbox/tasks/ME/THISPROJECT/basicmouse".


02 »  Rename the "basicmouse" folder with the name of your new experiment.  Use a unique name that allows you to identify it.  If you anticipate having different versions of the same experiment, enumerate them in increasing order.
e.g., "//sandbox/tasks/ME/20131231_whatever".
Good! You already have an experiment on the internet! Just go to "http://neuronoodle.org/sandbox/tasks/ME/20131231_whatever" and you'll find the "Before starting" page.


03 »  Modify the title in the header in "./index.html" to match the same name of the folder.
This will show the name of the experiment in the title of the browser.  It's important because subjects have been asked to report any technical issues to our email (neuronoodle@gmail.com), specifying what's the task they were running.  The TITLE IN THE BROWSER SHOULD MATCH THE NAME OF THE FOLDER.
e.g.  "<title>ME/210131231_whatever</title>".


04 »  We now just need to work out how to tell to the browser what's the experiment we plan to do – i.e., to code the task itself. You'll find some files in "//sandbox/tasks/ME/20131231_whatever/js/".  Go have a look!
They are called:
  "expt_aux.js"
  "expt_cond.js"
  "expt_func.js"
  "expt_pars.js"
  "expt_run.js"
These are JavaScript files that will be executed at the beginning of your code.  Whatever you run in there, it will be executed from the introductory website "Before running the experiment" !! Of course we want to avoid that, so most of things will be executed inside functions. We'll call these functions when we actually start the task. 


05 – expt_pars.js »  The first thing to do is to declare the variables we are going to use.  You can simply do it by adding lines inside the "setExperiment()" function in the "expt_pars.js" file.
e.g.: "var parameters.foo = 1;"
Again, be aware that the file will be executed straight from the very first page (before the actual experiment) unless you add it inside the "setExperiment()" function. The function will be called at every time you start the experiment. So, for example, if participants leave the fullscreen mode and restart the experiment again, all variables will be initialised again so that the data from the first (unfinished) experiment and the second one don't mix and mess up everything.
Also, it means that if you create a variable outside the function to save the size of the browser into a variable called foo_size, and afterwards you go into fullscreen mode, then foo_size will be wrong.
If you don't understand what you just read, read it again. If you still don't get it, I'll be happy trying to explain everything a bit clearer or helping you with any doubts :)
Additionally, every single variable you want to store should belong to one of five big structs:
  parameters  ::  all parameters to set. values in the other structs will reflect this parameters.
  numbers     ::  number of blocks, trials, etc... (will be copied from the parameters struct!)
  sdata       ::  variables and responses for every single trial (badgui format)
  board       ::  struct where you should use to plot
  coding      ::  extra variables you might need


06 – expt_func.js »  As you might have already found out, "expt_func.js" has only a few functions.  Don't bother about them (or read them to get some inspiration). This file is where you should declare every single function you plan to use in your experiment.
Hence, the second thing to do is to declare all the functions you need to use.
In particular, you need to declare "hideStimuli()", "showStimulus()" and "updateStimuli()"
Tip: We have created a few external functions that might be useful for you.  You can have a look at "//lib/js/nntools_*.js". There are some implementation of MATLAB functions as well!


07 – expt_cond.js » The file "expt_cond.js" is used to define the design of the experiment: what condition for what block, the value of all of the variables in each block/trial...
For instance, you might want to change how "sdata.vb_x1", "sdata.vb_x2" and "sdata.vb_y" are determined.


08 – expt_run.js »  The file "expt_run.js" should have one single function called "runExperiment()".  This is your main function, where your experiment starts.  It will be the first and only thing executed when you start the experiment.  The functions and parameters you've defined before should be used here.  You'll see that some parts of the code you plan to write have already been added (e.g., how to create a new paper with the Raphael Library so that you can draw anything you want, etc).  Thanks to Steven for working out how to use Raphael (among so many other things!).
Here is where you define the stimulus you're going to present


09 – expt_aux.js »  Finally, there's just a few tweaks to do.  The file "expt_aux.js" will contain some functions.
You need to complete the following ones:
stopExperiment() :: remove all of the Raphael objects you've been using to plot the experiment
saveExperiment() :: say which variables should be saved

10 » There's a last thing to do. Participants also need to know what is the task. Add detailed (but not too boring) instructions in a file called "html/instructions.html".

11 » Finally, when everything is working, remove the files "readme.md" (this file), and "task.html".

That's it! you're ready to go!  Good luck with the debugging :)
Jan


