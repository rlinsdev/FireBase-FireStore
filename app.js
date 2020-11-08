const cafeList = document.querySelector('#cafe-list');

// Create element and render café

function renderCafe(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);
  cafeList.appendChild(li);
}

const cafes = db
  .collection('Cafes')
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((element) => {
      renderCafe(element);
      //console.log(element.data());
    });
  });
