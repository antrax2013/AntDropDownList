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
    /// var pairedList = new PairedDropDownList(); -> déclaration
    /// pairedList.initPairedDropDownList("#liste1", "#liste2", "/Controler/Action/", true); -> initialisation
    /// </remarks>

    var _FromDropDownList = null;
    var _ToDropDownList = null;
    var _selectedValue = null;
    var _UrlActionControler = null;
    var _withEmptyEntry = true;
	
	/// <summary>
    /// Callback function appelée sur l'événement onChange de la DDL de destination
    /// </summary>
	var _ToDropDownListChange = function () { };
	
	var _FromDropDownListChange = function () {
	/// <summary>
    /// Callback function appelée sur l'événement onChange de la DDL source
    /// </summary>
	/// <remarks> 
	/// Par défaut le chargement se fait en ajax.
    /// </remarks>
		var ID = $(this).val();

		//Chargement des données
		if (ID != null && !isNaN(ID)) {
			_ToDropDownList.empty();
			$.ajax({
				type: "POST",
				async: false, //En mode synchrone
				url: _UrlActionControler,
				dataType: "JSON",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({ 'parent': ID }),
				success: function (retour) {
					if (_withEmptyEntry == true) {
						_ToDropDownList.append($("<option />").val("").text(""));
					}

					//Création de la liste des options
					$.each(retour.d, function () {
						_ToDropDownList.append($("<option />").val(this.Value).text(this.Text.HtmlDecode()));
						if (this.Selected || this.Value == _selectedValue) _ToDropDownList.val(this.Value);
						_ToDropDownList.change();
					});
				}
			});
		}
	};
	
	//Accesseur sur la méthode _ToDropDownListChange, permet sa redéfinition
    this.ToDropDownListChange = function (fn) { if (typeof (fn) == 'function') _ToDropDownListChange = fn; }
	
	//Accesseur sur la méthode _FromDropDownListChange, permet sa redéfinition
    this.FromDropDownListChange = function (fn) { if (typeof (fn) == 'function') _FromDropDownListChange = fn; }

    this.initPairedDropDownList = function (FromDropDownList, ToDropDownList, ActionControler, withEmptyEntry, selectedValue) {
        /// <summary>
        /// Méthode d'initialisation.
        /// </summary>
        /// <param name="FromDropDownList" type="Handdle Jquery">Handdle sur la liste source</param>
        /// <param name="ToDropDownList" type="Handdle Jquery">Handdle sur la liste destination</param>
        /// <param name="ActionControler" type="String">L'action du controler a appeler</param>
        /// <param name="withEmptyEntry" type="Boolean">Option ajoutant une ligne vide en début de liste</param>

        //Stockage des paramètres
        _FromDropDownList = $(FromDropDownList);
        _ToDropDownList = $(ToDropDownList);
        _UrlActionControler = ActionControler;
        _withEmptyEntry = withEmptyEntry != false ? true : false;
        _selectedValue = selectedValue;

        //Bind du change
        _ToDropDownList.change(function () { _ToDropDownListChange(); });
        _FromDropDownList.change(function () { _FromDropDownListChange(); });        

        //Lancement de la mise à jour au chargement si une valeur par défaut est définie
        if (_selectedValue != null) _FromDropDownList.change();
    }    

    //Méthode forçant les valeurs et la mise à jour des DDL
    this.ForceValues = function (valFromDDL, valToDDL) {
        _selectedValue = valToDDL;
        _FromDropDownList.val(valFromDDL);
        _FromDropDownList.change();
    }

}