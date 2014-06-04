<?php
class item 
{
	public $Value="";
	public $Text="";
	public $Selected=false;
	
	public function __construct($a_value, $a_text, $a_selected=false)
    {
		$this->Value = $a_value;
	    $this->Text = $a_text;
        $this->Selected = $a_selected;
	}
}
?>