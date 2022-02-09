function calculate() {
  let sensitivity = document.getElementById("sensitivity").value / 100;
  let specificity = document.getElementById("specificity").value / 100;
  let prior = document.getElementById("prior").value / 1000000;
  let positive = document.getElementById("positive").checked
  console.log({
    "sens": sensitivity,
    "spec": specificity,
    "prior": prior,
    "pos": positive
  });
  let result = -1;
  if (positive) {
    result = (prior*sensitivity) / ((prior*sensitivity) + ((1-prior)*(1-specificity)));
  } else {
    result = ((1-prior)*(specificity)) / (((1-prior)*(specificity)) + (prior*(1-sensitivity)))
  }
  let dec = 2;
  let outputVal = Math.floor(result*100*Math.pow(10, dec))/Math.pow(10, dec)
  document.getElementById("output").innerHTML = "<h3>Amount to trust result: "+outputVal+"%</h3>";
}
