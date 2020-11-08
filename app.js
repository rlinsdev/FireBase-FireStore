const form = document.querySelector('#add-cafe-form');
const cafeList = document.querySelector('#cafe-list');

// Create element and render café

function renderCafe(doc) {
  // console.log(cafeList)
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //deletting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    const singleDoc = db.collection('Cafes').doc(id);
    singleDoc.delete();
    //GetData();
  });
}

// GetData();
// function GetData() {
//   // Getting data
//   const cafes = db
//     .collection('Cafes') //.where("city","==","London")
//     //.OrderBy("city")
//     .get()
//     .then((snapshot) => {
//       snapshot.docs.forEach((element) => {
//         renderCafe(element);
//       });
//     });
// }

// Saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('Cafes').add({
    name: form.Name.value,
    city: form.City.value,
  });

  form.Name.value = form.City.value = '';
  //GetData();
});

// real-time listener
db.collection('Cafes').orderBy('city').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        //console.log(change.type)
        if(change.type=='added'){
            renderCafe(change.doc);
        } else if(change.type=='removed'){
            let li = cafeList.querySelector('[data-id='+change.doc.id+']');
            cafeList.removeChild(li);
        }
        
    });
});
