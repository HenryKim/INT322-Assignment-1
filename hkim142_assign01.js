/* I, <hyungi kim> (<025 741 125>), affirm that I have read 
 * and understood the Seneca College Academic Honesty Policy 
 * and that this assignment is all my own work.
 */

function UPC(upc_code){
	this.code;
   if( upc_code != undefined){
       if(this.validate(upc_code)){
			this.code = upc_code;
			/*uses validate method on prototype 
			if values is truthy than current code variable is argument(upc_code)*/
		}
       else{
			this.code = "";
			/*
				Else, if validate is false than code value will be ""
			*/
			}
   }
};

UPC.prototype = {
   validate : function(upc_code){
       var upc_odd = 0,
			upc_even = 0,
			upc_temp = 0,
			upc_sum = 0,
			i = 0;
			/*
				variable declaired all default values are 0'
			*/
      
		upc_odd=  parseInt(upc_code[0]) + parseInt(upc_code[1]) + parseInt(upc_code[3]) + parseInt(upc_code[5]) + parseInt(upc_code[7]) + parseInt(upc_code[9]);
		upc_even=  parseInt(upc_code[2]) + parseInt(upc_code[4]) + parseInt(upc_code[6]) + parseInt(upc_code[8]) + parseInt(upc_code[10]);
		upc_odd = upc_odd*3;
		upc_sum = 10 - ((upc_odd + upc_even) % 10)
      /*
	  adds up all even number together and all odd number together, Yet uses parseInt method to covert sting to int type
	  after all number in code is added up
	  multiple 3 on sum of odd numbers
	  and adds even number on to it and modulo by 10 and minus values from 10
	  */
       if( upc_sum == parseInt(upc_code[11])) return true;
	   /*
	   if result of calculation is matches to check code return true
	   otherwise return false;
	   */
       else return false;
      
   },
   set_code : function(upc_code, accept_invalid){
       if(!accept_invalid){
           if( this.validate(upc_code)){
           this.code = upc_code;
		   /*
		   if given arguement (upc_code) is validate than current obj's code is chages to given arguement
		   */
           }
           else{
           this.code = "";
		   /*
		   else current obj's code value will be ""
		   */
           }
       } 
	   else {
           this.code = upc_code;       
		   /*
		   if accept_invlid is truthy 
		   than current obj's code variable is changes to given arguement ( upc_code)
		   */
       }
   },
   get_code : function(){
       return this.code;
	   /*
	   simple method that return current obj's code variable value
	   */
   }
}

function Product(options){
   this.priceChangeListeners = new Array();
	/*
	create new array object in current object
	*/
   if(!options.hasOwnProperty('name')) this.name = 'TBD';
   else this.name = options.name;
   /*
   if method hasOwnProperty of argument's name is false than current obj's name variable's value will be TBD
   other wise value of current name will be given argument's name
   */
  
   if( options.price > 0){
       this.price = Math.round(options.price * 10) / 10;
	   /*
		if given argument's price is bigger than 0
		current obj's prcie variable will be method by Math.round of arguement's price value multiple by 10 
		and divide 10 by return value of math.round method
	   */
   } else {
       this.price = 0;
	   /*
	    other wise default value will be 0
	   */
	   }
  
   if(options.hasOwnProperty('upc')){
       if( typeof(options.upc) == 'string'){
           this.upc = new UPC(options.upc); 
/*
	if hasOwnProperty method of argument option is truty 
	and if type of options is string
	than create new UPC object with argument's upc value
*/		   
       } 
	   else{
           this.upc = options.upc;
		   /*
		   other wise curren  upc is arguements' upc
		   */
       }
	} 
	else{
       this.upc = new UPC('');   
	   /*
	    otherwise default UPC will be ''
	   */
   }
  
   if( options.hasOwnProperty('imagepath')){
       if( options.imagepath[0] == '/'){
           var ext = options.imagepath.split('.').pop();
           if( ext == 'png' || ext == 'gif' || ext == 'jpeg' || ext == 'jpg'){
               this.imagepath = options.imagepath;
			   /*
				if extension of given image path is matches to png or gif or jpeg or jpg 
				than saves given image path to current obj's image path
			   */
           }
       }     
   }
}

Product.prototype = {
   addPriceChangeListener : function(listener){
       this.priceChangeListeners.push(listener); 
		/*
		using .push method to put given arguement listener on array
		*/
   },
   removePriceChangeListener : function(listener){
       var i = 0;
       for(i = 0; i < priceChangeListeners.length; i++) {
          if(priceChangeListeners[i] === listener) {
               priceChangeListeners.splice(i, 1);
           }
       }
	   /*
	   loops array from beginning to end and finds matches value by given arguement
	   if values in array === given argument uses splice method to delete column
	   */
   },
   setPrice : function(new_Price){
       if( new_Price > 0){
           this.price = new_Price;
           for(var i = 0; i < this.priceChangeListeners.length; i++) {
               this.priceChangeListeners[i](new_Price, this);
           }
       }
	   /*
		if argument is greater than 0
		save current obj's price variable as given argument
		and loop down array and saves arguement on every array
	   */
   },
   getPrice : function(){
       return this.price;
	   /*
		simple method that return current obj price variable's value
	   */
   }
}