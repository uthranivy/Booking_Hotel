                let b = localStorage.getItem("myValue");
                console.log("The Value Received is " + b);
                let resetValue =b;  
                localStorage.setItem("myValue", resetValue); 


let hotelObjectList = new Array();

const fetchCity = async () => {
   
    const result = await fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${resetValue}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US&rapidapi-key=9929b549bdmsh519be7692f11e24p1009a1jsn9f08cd2457fb`);
    const respObject = await result.json();
    respObject.data.forEach((element) => {
      let eachHotel = {
        hotelName: element.result_object.name,
        hotelPhoto: element.result_object.photo.images.small.url,
        hotelRate: element.result_object.rating, 
        hotelAddress: element.result_object.address,
      };
      if(eachHotel.hotelRate !== undefined && eachHotel.hotelAddress !== null){
      hotelObjectList.push(eachHotel);}
    });
    createHotelListAndAttachToUL(hotelObjectList);
  };
  
  const fetchHotelUsingAjax = () => {
    let xhr = new XMLHttpRequest();
    let url =  `https://travel-advisor.p.rapidapi.com/locations/search?query=${resetValue}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US&rapidapi-key=9929b549bdmsh519be7692f11e24p1009a1jsn9f08cd2457fb`;
    xhr.open("GET", url, true);
    xhr.send();
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let respObject = JSON.parse(xhr.response);
        console.log("respObject -> ", respObject);
  
        respObject.data.forEach((element) => {
            let eachHotel = {
                hotelName: element.result_object.name,
                hotelPhoto: element.result_object.photo.images.small.url,
                hotelRate: element.result_object.rating, 
                hotelAddress: element.result_object.address,
              };
           
          hotelObjectList.push(eachHotel);
        });
        console.log("hotelObjectList -> ", hotelObjectList);
        createHotelListAndAttachToUL(hotelObjectList);
      }
    };
  };
  
  const createHotelListAndAttachToUL = (hotelArrayList) => {
    const allHotelStringAppended = hotelArrayList
      .map((dishObject) => {
        return `<a href="detail.html"><div class="hotel">
        <img src="${dishObject.hotelPhoto}" class="img_hotel">
        <div class="hotelname">
            <h3>${dishObject.hotelName}</h3>
            <div id="rating">${dishObject.hotelRate}
                <span class="fa fa-star checked" id="1"></span> 
            </div>
            <p>${dishObject.hotelAddress}</p>
        </div>
    </div>  </a>`;
      })
      .join("");
    console.log(allHotelStringAppended);
  
    //attach the response array of <li>s  in dishlist -> UL
    const dishListUL = document.getElementById("list-view");
    dishListUL.innerHTML = allHotelStringAppended;
  };


  fetchCity();
  
