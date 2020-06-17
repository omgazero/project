var dissolveArray = [];

function dissolve() {
  let dissolveDone = [];
  for (let i = 0; i < dissolveArray.length; i++) {
    if (dissolveEffect(dissolveArray[i]) == true)
      dissolveDone.push(i);
  }
  for (let i = 0; i < dissolveDone.length; i++) {
    dissolveArray[dissolveDone[i]].geometry.dispose();
    dissolveArray[dissolveDone[i]].material.dispose();
    scene.remove(dissolveArray[dissolveDone[i]]);
    dissolveArray.splice(dissolveDone[i], 1);
  }
}
