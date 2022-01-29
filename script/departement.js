class Departement{

    constructor(nom){
      this.nom =  nom;
    }

    static liste (){
        let data = [];
        if(localStorage.getItem("listeDepartements")){
            data = JSON.parse(localStorage.getItem("listeDepartements"));
        }

        return data;
    }

    save(){
        let data = [];

        if(localStorage.getItem("listeDepartements")){
            data = JSON.parse(localStorage.getItem("listeDepartements"));
            data.push(this);
        }else{
            data.push(this);
        }

        localStorage.setItem("listeDepartements", JSON.stringify(data))
        console.log("Objet saved");
    }

    updateItem(index){
        if(localStorage.getItem("listeDepartements")){
            let data = JSON.parse(localStorage.getItem("listeDepartements"));
            let indexTrouve = data.findIndex((item, currentIndex)=> currentIndex === index);
            if(indexTrouve >= 0){
                data[indexTrouve].nom = this.nom
                localStorage.setItem("listeDepartements", JSON.stringify(data))
            }
            
        }
    }

    remove(){

        let data  = JSON.parse(localStorage.getItem("listeDepartements"));
        let index = data.findIndex((item)=> item.nom === this.nom);

        if(index >= 0){
            data.splice(index, 1);
            localStorage.setItem("listeDepartements", JSON.stringify(data))
        }
    }
  

}


const dom = {

    listeDepartements : [],
    departementID : null,
    

    save : function (){
        let nom = document.getElementById("nom");
        let departement = new Departement(nom.value);
        departement.save();
        this.afficher();
        this.videChamps();
    },

    removeItem: function(index){
        let dep = new Departement(this.listeDepartements[index].nom);
        dep.remove(); 
        this.afficher();             
    },

    getUpdateItem(index){
        let dep = new Departement(this.listeDepartements[index].nom);
        this.departementID = index;
        document.getElementById("nom").value = dep.nom;
        document.getElementById("enregistrerDepartement").style.display = "none";
        document.getElementById("modifierDepartement").style.display = "block";
    },

    postUpdateItem(){
        let dep = new Departement(document.getElementById("nom").value);
        dep.updateItem(this.departementID);
        this.afficher(); 
        this.videChamps();

        document.getElementById("enregistrerDepartement").style.display = "block";
        document.getElementById("modifierDepartement").style.display = "none";
    },
    
    afficher : function(){
        this.listeDepartements = Departement.liste();
        let element = document.getElementById("displayDepartement");
        let content = '';
        this.listeDepartements.forEach(function (item, index){
           
            content += `<tr>
                            <td>${(index + 1)}</td>
                            <td>${item.nom}</td>
                            <td>
                                <button onclick="dom.getUpdateItem(${index})" class="btn btn-primary"> Modifier </button>
                                <button onclick="dom.removeItem(${index})" class="btn btn-danger"> Supprimer </button>
                            </td>
                        </tr>
                        `;
            
        })
        
        element.innerHTML = content;
    },

    videChamps: function(){
        document.getElementById("nom").value = '';
    }


}



dom.afficher();

/**
 * Liste des departements
 */
let xml = new XMLHttpRequest();

xml.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        console.log(this.response);
    }
}

xml.open("GET", "http://127.0.0.1:8000/api/v1/departement/liste");
xml.send();

/**
 * Creation departement
 */


 xml = new XMLHttpRequest();

 xml.onreadystatechange = function(){
     if(this.readyState == 4 && this.status == 200){
         console.log(this.response);
     }
 }

 let url     = "http://127.0.0.1:8000/api/v1/departement/add";
 let params  = `?nom=comptabilite`;
 let fullUrl = `${url}${params}`;

 xml.open("POST", fullUrl);
//  xml.send();