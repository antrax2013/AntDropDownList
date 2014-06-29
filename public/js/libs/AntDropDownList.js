/*! AntDropDownList V0.11
* Copyright (c) 2014 AntProduction
* http://antproduction.free.fr/AntDropDownList
* https://github.com/antrax2013/AntDropDownList
*
* GPL license:
*   http://www.gnu.org/licenses/gpl.html
*
* Contributor: antrax2013@hotmail.com
*
*/

function LoadAntDropDownList($p_elment, p_urlActionControler, p_withEmptyEntry, p_selectedValue, p_jsonAjaxParameters) {
    /// <summary>
    /// Méthode alimentant la dropDownList
    /// </summary>
    /// <param name="p_elment" type="Handdle Jquery">Handdle sur la liste de destination</param>
    /// <param name="p_urlActionControler" type="URL">L'URL à appeler</param>
    /// <param name="p_withEmptyEntry" type="Boolean">Option ajoutant une ligne vide en début de liste</param>
    /// <param name="p_selectedValue" type="Integer">Option la valeur à selectionner dans la liste de destination</param>
    /// <param name="p_jsonAjaxParameters" type="JSON object">Option objet JSON conetant les paramètres à envoyé à l'URL</param>

    $p_elment.empty();
    $.ajax({
        type: "POST",
        async: false, 
        url: p_urlActionControler,
        dataType: "JSON",
        data: JSON.stringify(p_jsonAjaxParameters),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
			if (p_withEmptyEntry == true) {
                $p_elment.append($("<option />").val("").text(""));
            }

            //Création de la liste des options
            $.each(data.d, function () {
                $p_elment.append($("<option />").val(this.Value).text(this.Text));
                if (this.Selected || this.Value == p_selectedValue) { $p_elment.val(this.Value); }
            });
        }
    });
}