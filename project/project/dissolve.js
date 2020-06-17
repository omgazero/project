var dissolveArray = [];

function dissolve() {
  let dissolveDone = [];
  for (let i = 0; i < dissolveArray.length; i++) {
    if (dissolveEffect(dissolveArray[i]) == true)
      dissolveDone.push(i);
  }
  for (let i = 0; i < dissolveDone.length; i++) {
    //console.log('a');
    dissolveArray[dissolveDone[i]].geometry.dispose();
    dissolveArray[dissolveDone[i]].material.dispose();
    scene.remove(dissolveArray[dissolveDone[i]]);
    dissolveArray.splice(dissolveDone[i], 1);
  }
}
function dissolveEffect(obj){
  let threshold = obj.material.uniforms.threshold.value;
  //console.log(threshold);
  if(threshold!=1.0){
    threshold = Math.min (threshold + 0.01, 1.0);
    obj.material.uniforms.threshold.value = threshold ;
    return false;
  }
  return true;
}
