/*! AntPairedDropDownList V0.11
* Copyright (c) 2014 AntProduction
* http://antproduction.free.fr/AntPairedDropDownList
* https://github.com/antrax2013/AntPairedDropDownList
*
* GPL license:
*   http://www.gnu.org/licenses/gpl.html
*
* Contributor: antrax2013@hotmail.com
*
*/
var AntPairedDropDownList = function () {
    /// <summary>
    /// Classe de gestion des listes couplées
    /// </summary>
    /// <remarks> Usage
    /// var pairedList = new AntPairedDropDownList(); -> déclaration
    /// pairedList.initPairedDropDownList("#liste1", "#liste2", "/Controler/Action/", true); -> initialisation
    /// </remarks>

    var _fromDropDownList = null;
    var _toDropDownList = null;
    var _selectedValue = null;
    var _urlActionControler = null;
    var _withEmptyEntry = true;
	
	/// <summary>
    /// Callback function appelée sur l'événement onChange de la DDL de destination
    /// </summary>
	var _toDropDownListChange = function () { };
	
	var _fromDropDownListChange = function () {
	/// <summary>
    /// Callback function appelée sur l'événement onChange de la DDL source
    /// </summary>
	/// <remarks> 
	/// Par défaut le chargement se fait en ajax.
    /// </remarks>
		var ID = _fromDropDownList.val();
		
		//Chargement des données
		if (ID != null && !isNaN(ID)) {
			_toDropDownList.empty();
			$.ajax({
				type: "POST",
				//async: false, //En mode synchrone
				url: _urlActionControler,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({'parent' :ID }),
				success: function (retour) {
				
					if (_withEmptyEntry == true) {
						_toDropDownList.append($("<option />").val("").text(""));
					}

					//Création de la liste des options
					$.each(retour.d, function () {
						_toDropDownList.append($("<option />").val(this.Value).text(this.Text));
						if (this.Selected || this.Value == _selectedValue) _toDropDownList.val(this.Value);
						_toDropDownList.change();
					});
				}
			});
		}
	};
	
	//Accesseur sur la méthode _toDropDownListChange, permet sa redéfinition
    this.ToDropDownListChange = function (p_fn) { if (typeof (p_fn) == 'function') _toDropDownListChange = p_fn; }
	
	//Accesseur sur la méthode _fromDropDownListChange, permet sa redéfinition
    this.FromDropDownListChange = function (p_fn) { if (typeof (p_fn) == 'function') _fromDropDownListChange = p_fn; }

    this.initPairedDropDownList = function (p_fromDropDownList, p_toDropDownList, p_actionControler, p_withEmptyEntry, p_selectedValue) {
        /// <summary>
        /// Méthode d'initialisation.
        /// </summary>
        /// <param name="p_fromDropDownList" type="Handdle Jquery">Handdle sur la liste source</param>
        /// <param name="p_toDropDownList" type="Handdle Jquery">Handdle sur la liste destination</param>
        /// <param name="p_actionControler" type="String">L'action du controler à appeler</param>
        /// <param name="p_withEmptyEntry" type="Boolean">Option ajoutant une ligne vide en début de liste</param>
		/// <param name="selectedValue" type="Integer">Option la valeur à selectionner dans la liste de destination</param>
		
        //Stockage des paramètres
        _fromDropDownList = $(p_fromDropDownList);
        _toDropDownList = $(p_toDropDownList);
        _urlActionControler = p_actionControler;
        _withEmptyEntry = p_withEmptyEntry != false ? true : false;
        _selectedValue = p_selectedValue != undefined? p_selectedValue : null;

        //Bind du change
        _toDropDownList.change(function () { _toDropDownListChange(); });
        _fromDropDownList.change(function () { _fromDropDownListChange(); });  
		
        //Lancement de la mise à jour au chargement si une valeur par défaut est définie
        if (_selectedValue != null) {
			_fromDropDownList.change();
		}
    }    

    //Méthode forçant les valeurs et la mise à jour des DDL
    this.ForceValues = function (p_valFromDDL, p_valToDDL) {
        _selectedValue = p_valToDDL;
        _fromDropDownList.val(p_valFromDDL);
        _fromDropDownList.change();
    }

}