/* accordion functions*/
var TINY={};
function T$(i){return document.getElementById(i)}
function T$$(e,p){return p.getElementsByTagName(e)}

TINY.accordion=function(){
	function slider(n){this.n=n; this.a=[]}
	slider.prototype.init=function(t,e,m,o,k){
		var a=T$(t), i=s=0, n=a.childNodes, l=n.length; this.s=k||0; this.m=m||0;
		for(i;i<l;i++){
			var v=n[i];
			if(v.nodeType!=3){
				this.a[s]={}; this.a[s].h=h=T$$(e,v)[0]; this.a[s].c=c=T$$('div',v)[0]; h.onclick=new Function(this.n+'.pr(0,'+s+')');
				if(o==s){h.className=this.s; c.style.height='auto'; c.d=1}else{c.style.height=0; c.d=-1} s++
			}
		}
		this.l=s
	};
	slider.prototype.pr=function(f,d){
		for(var i=0;i<this.l;i++){
			var h=this.a[i].h, c=this.a[i].c, k=c.style.height; k=k=='auto'?1:parseInt(k); clearInterval(c.t);
			if((k!=1&&c.d==-1)&&(f==1||i==d)){
				c.style.height=''; c.m=c.offsetHeight; c.style.height=k+'px'; c.d=1; h.className=this.s; su(c,1)
			}else if(k>0&&(f==-1||this.m||i==d)){
				c.d=-1; h.className=''; su(c,-1)
			}
		}
	};
	function su(c){c.t=setInterval(function(){sl(c)},20)};
	function sl(c){
		var h=c.offsetHeight, d=c.d==1?c.m-h:h; c.style.height=h+(Math.ceil(d/5)*c.d)+'px';
		c.style.opacity=h/c.m; c.style.filter='alpha(opacity='+h*100/c.m+')';
		if((c.d==1&&h>=c.m)||(c.d!=1&&h==1)){if(c.d==1){c.style.height='auto'} clearInterval(c.t)}
	};
	return{slider:slider}
}();


/*Custom Account Numbers dropdown list*/

$(document).ready(function() {
	
			
            $(".dropdown_accounts dt a").click(function() {
				$(".top-menu-cont ul li a").removeClass("active");	
				$(".dropdown_accounts dt a").addClass("active");	
				$(".dropdown_accounts dd ul").addClass("show");
				$(".dropdown_accounts dd ul").addClass("show");
				$(".dropdown_accounts dd ul").toggle();
				$(".dropdown_accounts dd ul").show();
				setupJQueryScrollBars();
				
				

            });

            $(".dropdown_accounts dd ul li a").click(function() {

                var text = $(this ).html();
				//  var text = $(".account-no", this ).html();
				var accountNo="<div class='account-no'>"+text+"</div>"
				 var accountName = $(".account-name", this ).html();
				//alert(accountName)

                $(".dropdown_accounts dt a span").html(text);
				$(".dropdown_accounts dt a span").removeClass("top_menu_span");

                $(".dropdown_accounts dd ul").hide();
				//$(".menu_account_name").show();
				//$(".menu_account_name").html(accountName);
				
               });
			   
           

            $(document).bind('click', function(e) {

                var $clicked = $(e.target);

                if (! $clicked.parents().hasClass("dropdown_accounts"))

                    $(".dropdown_accounts dd ul").hide();

            });
                                                
                                                 $(".dropdown_accounts dd ul" ).bind('mouseover', function(e) {

                                                                                $(this).stop(true, true).fadeIn();
                                                                                                                                                 

            });



			
			
			
			// search account function 
			
			
(function ($) {
  // custom css expression for a case-insensitive contains()
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };


  function listFilter(header, list) { // header is any element, list is an unordered list
   

    $(".search_txtbox").change( function () {
        var filter = $(this).val();
        if(filter) {
          // this finds all links in a list that contain the input,
          // and hide the ones not containing the input while showing the ones that do
          $(list).find("a:not(:Contains(" + filter + "))").parent().slideUp();
          $(list).find("a:Contains(" + filter + ")").parent().slideDown();
        } else {
          $(list).find("li").slideDown();
        }
        return false;
      })
		.keyup( function () {
			// fire the above change event after every letter
			$(this).change();
		});
  }


		  //ondomready
		  $(function () {
			listFilter($(".search_txtbox"), $(".dropdown_accounts .scroll_container .content "));
            listFilter($(".search_txtbox"), $(".dropdown_receiver .scroll_containers .content "));
            listFilter($(".search_txtbox"), $(".dropdown_morereceiver .scroll_containers_more .content "));

		  });
		}(jQuery));

   });



/**************************************/   
/*E-Gram Primary reciever*/
/**************************************/

$(document).ready(function() {
	
			
            $(".dropdown_receiver dt input").click(function() {
				$(".dropdown_receiver dd ul").addClass("show");
				$(".dropdown_receiver dd ul").toggle();
				$(".dropdown_receiver dd ul").show();

            });

            $(".dropdown_receiver dd ul li a").click(function() {

                var text = $(this).text();

                $(".dropdown_receiver dt input").attr("value",text);

                $(".dropdown_receiver dd ul").hide();

               });

            $(document).bind('click', function(e) {

                var $clicked = $(e.target);

                if (! $clicked.parents().hasClass("dropdown_receiver"))

                    $(".dropdown_receiver dd ul").hide();

            });
   });



/**************************************/   
/*EGram Secondry Reciever*/
/**************************************/

$(document).ready(function() {
	
			
            $(".dropdown_morereceiver dt textarea").click(function() {
				$(".dropdown_morereceiver dd ul").addClass("show");
				$(".dropdown_morereceiver dd ul").toggle();
				$(".dropdown_morereceiver dd ul").show();

            });

            $("#donebutton").click(function() {
            	$("a.ckecked").text (function (){
            	
                var text = $(this).text();

                $(".dropdown_morereceiver dt textarea").attr("value",text);

                $(".dropdown_morereceiver dd ul").hide();

               });
});
            $(document).bind('click', function(e) {

                var $clicked = $(e.target);

                if (! $clicked.parents().hasClass("dropdown_morereceiver"))

                    $(".dropdown_morereceiver dd ul").hide();

            });
   });


   /*Custom Scrollbar */
$(document).ready(function(e) {
	/*
    $(".scroll_container .content").mCustomScrollbar();
	$(".scroll_container2 .content").mCustomScrollbar();
	$(".scroll_container3 .content").mCustomScrollbar();
	
	$(".scroll_containers .content").mCustomScrollbar();
	$(".scroll_containers_more .content").mCustomScrollbar();
	*/
	setupJQueryScrollBars();
});


/* function to fix the -10000 pixel limit of jquery.animate */
$.fx.prototype.cur = function(){
    if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
      return this.elem[ this.prop ];
    }
    var r = parseFloat( jQuery.css( this.elem, this.prop ) );
    return typeof r == 'undefined' ? 0 : r;
}


// Dropmenu 
	// initialise plugins
		jQuery(function(){
			jQuery('ul.sf-menu').superfish();
		});


// Data Picker Javascript

$(function() {
		$( ".from" ).datepicker({
			showOn: "button",
			buttonImage: "../images/cal_icon.png",
			buttonImageOnly: true,			
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			onSelect: function( selectedDate ) {
				$( ".to" ).datepicker( "option", "minDate", selectedDate );
			}
		});
		$( ".to" ).datepicker({
			showOn: "button",
			buttonImage: "../images/cal_icon.png",
			buttonImageOnly: true,	
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			onSelect: function( selectedDate ) {
				$( ".from" ).datepicker( "option", "maxDate", selectedDate );
			}
		});
	});
	
// Auto complete function

$(function() {
		var availableTags = [
		];
		function split( val ) {
			return val.split( /;\s*/ );
		}
		function extractLast( term ) {
			return split( term ).pop();
		}

		$( ".recipients" )
			// don't navigate away from the field on tab when selecting an item
			.bind( "keydown", function( event ) {
				if ( event.keyCode === $.ui.keyCode.TAB &&
						$( this ).data( "autocomplete" ).menu.active ) {
					event.preventDefault();
				}
			})
			.autocomplete({
				minLength: 0,
				source: function( request, response ) {
					// delegate back to autocomplete, but extract the last term
					response( $.ui.autocomplete.filter(
						availableTags, extractLast( request.term ) ) );
				},
				focus: function() {
					// prevent value inserted on focus
					return false;
				},
				select: function( event, ui ) {
					var terms = split( this.value );
					// remove the current input
					terms.pop();
					// add the selected item
					terms.push( ui.item.value );
					// add placeholder to get the comma-and-space at the end
					terms.push( "" );
					this.value = terms.join( "; " );
					return false;
				}
			});
	});
	

// Profile Personal Settings 
$(document).ready(function (){
		$(".primaryaccount_btn").click(function (){
			// check and uncheck checkboxs on click
			$(".primaryaccount").removeClass("account-list-active");
			$(".primaryaccount p").css("display","none");
			$(".primaryaccount_btn").removeAttr("checked");
			$(this).attr('checked','checked');
			
			if($(this).attr("checked")=="checked"){
				$(this).closest('.primaryaccount').addClass("account-list-active");
				$(this).closest('.primaryaccount').find('p').fadeIn (500);				
			}
		});
		
		chnage_welcome_msg();
		//centering_dashboard();
		centering_values();
		centering_paging();
		
		$("#chartdiv embed").attr("wmode", "transparent");
	});
	
function external_url(url){window.location = url;}

// Welcome message to users 
 function chnage_welcome_msg(){
var mydate=new Date()
var hours=mydate.getHours()
//alert(hours)
var welcome_msg=""
	if (hours>=0  && hours<12){
		welcome_msg="Good morning "
		
	}
	else if (hours>=12 && hours<17 )
	{
		welcome_msg="Good afternoon "
		
	}
	else if (hours>=17){
		welcome_msg="Good evening "
		
}
else{}


$('.welcome_time').html(welcome_msg);
 }


function centering_dashboard(){
	
	$(".dashboard_items ul").each(function(index){
		var dashboard_items = $(this).find("li").length;
		if (dashboard_items == 1){
			$(this).attr("style","width:201px;");
			//$(".dashboard_items ul li").attr("style","width:400px;");
			}
		else if (dashboard_items == 2){
			$(this).attr("style","width:442px;");
			//$(".dashboard_items ul li").attr("style","width:300px;");
			}
		else {
			$(this).attr("style","width:668px;");
			//$(".dashboard_items ul li").attr("style","width:197px;");
			}
	})

}

function centering_values(){
	$(".unbilled_value").each(function(index){
		if ( !$(this).is(":visible") ) {return true;}
		var amount=$(this).find(".amount_sr").width();
		var currency=$(this).find(".amount_hallah").width();
		var total= amount + currency +10
		$(this).width(total);
	});
	//alert(total)
	
	}
function centering_paging(){
	var items=$(".paginationstyle a").length;
	//alert(items);
	var total= items*40;
	$(".paginationstyle").width(total);
	//alert(total)
	
	}