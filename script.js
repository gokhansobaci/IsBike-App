// api yi çekeceğimiz url ; 
const url ='https://api.ibb.gov.tr/ispark-bike/GetAllStationStatus';  



const desing_station = (istasyon) => {
  let design = `
  <div class="col">
  <div class="card text-center h-80 border border-dark">
      <div class="card-header text-light " style="background-color: #007FFF;" >
          <h5>${istasyon["adi"]}</h5>
          <p class="text-muted">İstasyon Kodu :${istasyon["istasyon_no"]}</p>
      </div>
      <div class="card-body d-flex justify-content-evenly flex-wrap bg-light bg-gradient border-top border-bottom border-dark">
          <button type="button" class="btn btn-success position-relative" style="box-shadow: 0px 0px 0px 1px black;">
              <i class="fa-solid fa-bicycle"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-light">
                  ${istasyon["bos"]}
                  <span class="visually-hidden" >Bos</span>
              </span>
              
          </button>
          <button type="button" class="btn btn-danger position-relative" style="box-shadow: 0px 0px 0px 1px black;"  >
              <i class="fa-solid fa-person-biking"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-light">
                 ${istasyon["dolu"]}
                  <span class="visually-hidden">Dolu</span>
              </span>
          </button>
          <a href="https://www.google.com/maps/?q=${istasyon["lat"]},${istasyon["lon"]}" class="btn  text-white" style="box-shadow: 0px 0px 0px 1px black; background-color:#007FFF; ">
              Haritada Göster
          </a>
      </div>
      <div class="card-footer bg-gradient text-light" style="background-color: #007FFF;" >
         Son Bağlantı : ${istasyon["sonBaglanti"]}
      </div>
  </div>
</div>

  
  `

  return design ; 
}


const data_read = () =>{
  let ara = document.getElementById('ara').value;

  fetch(url)
  .then(reading_data =>reading_data.json())
  .then(turning_data =>{
    let dlist = turning_data.dataList ; 
     if (ara!='') {
      dlist = dlist.filter(x=>x['adi'].toLowerCase().includes(ara.toLowerCase()))
     }
 

    let station_html = "";
    dlist.forEach(station => {
      station_html += desing_station(station)
    });
    document.getElementById("istasyonlar").innerHTML = station_html;
  })
  .catch(err => console.error("Hata :", err));
}


  const isbike_statistics  = () =>{
    fetch(url)
    .then(turn_data=> turn_data.json())
    .then(read_data=>{
      let station_number = read_data.dataList.length;
      let total_bike = 0  ; 
      let full_bike = 0  ; 

      read_data.dataList.forEach(x=>{
        total_bike +=parseInt(x['bos'])+ parseInt(x['dolu'])
         full_bike  += parseInt(x['dolu'])
      })

      console.log(station_number,total_bike,full_bike);

    })
    .catch(error => console.error("Hata : ",error));
  }