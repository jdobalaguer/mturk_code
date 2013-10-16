<h1>DONE!</h1>
<p>
  Experiment completed!  Well done and thanks<br>
  <br>
  <?php 
    if ($_POST["participant_performance"] > $_POST["minimum_performance"]) {
      echo "Your performance is <input value=\"".$_POST["participant_performance"]."\" type=\"text\" readonly=\"true\" /><br>
      Minimum performance is <input value=\"".$_POST["minimum_performance"]."\" type=\"text\" readonly=\"true\" /><br>
      Your verification code is <input value=\"".$_POST["participant_id"]."\" type=\"text\" readonly=\"true\" /><br>
      Copy this and paste into your HIT or you won't get paid!<br>";
    } else {
      echo "Your performance is <input id=\"vercodeDiv\" value=\"".$_POST["participant_performance"]."\" type=\"text\" readonly=\"true\" /><br>
      Minimum performance is <input value=\"".$_POST["minimum_performance"]."\" type=\"text\" readonly=\"true\" />. Bad luck!<br>
      We cant reveal your verification code and you won't get paid for this time.<br>";
    }
  ?>

  <br>
  Remember that if you have any problem you can write us back to neuronoodle@gmail com.
</p>
