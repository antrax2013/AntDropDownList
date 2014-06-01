/*! AntDropDownList V0.1
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

function LoadAntDropDownList($cible, UrlActionControler, withEmptyEntry, selectedValue) {
    $cible.empty();
    $.ajax({
        type: "POST",
        async: false, 
        url: UrlActionControler,
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
			if (withEmptyEntry == true) {
                $cible.append($("<option />").val("").text(""));
            }

            //Création de la liste des options
            $.each(data.d, function () {
                $cible.append($("<option />").val(this.Value).text(this.Text));
                if (this.Selected || this.Value == selectedValue) { $cible.val(this.Value); }
            });
        }
    });
}