var target={
	"target0":{
		"from":"梗枋魚港","to":"龜山島","dist":9100
	},
	"target1":{
		"from":"台東","to":"綠島","dist":33000
	},
	"target2":{
		"from":"台灣","to":"澎湖","dist":50000
	},
	"target3":{
		"from":"台東","to":"蘭嶼","dist":90000
	},
	"target4":{
		"from":"","to":"台灣海峽最窄處","dist":130000
	},
	"target5":{
		"from":"","to":"巴士海峽平均","dist":185000
	}
};


$(document).ready(function() {
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","data.csv",true);
	xmlhttp.send();
	
	xmlhttp.onreadystatechange=function(e){
		if(xmlhttp.readyState==4){
			xmlDoc=xmlhttp.responseText;
			//var data = $.csv.toArray(xmlDoc);
			var data=xmlDoc.split(/\n/);

			var total_dist=0;
			//加總的距離

			var data_idx=0;
			//目前統計到的筆數

			var last_dist=33000;

			

	    	do{
	    		var i=0;
	    		i++;

	    		obj=data[i].split(',');


	    		total_dist+=parseInt(obj[1]);
	    		obj[2]=total_dist;
	    		obj[3]=last_dist-parseInt(total_dist);

	    		var div=$('<div></div>')

	    		var obj0=$('<span></span>').css('class','date').append(obj[0]+' ');
	    		var obj1=$('<span></span>').css('class','date').append(obj[1]+'m ');
	    		var obj2=$('<span></span>').css('class','date').append('總計'+obj[2]+'m ');
	    		var obj3=$('<span></span>').css('class','date').append('剩餘'+obj[3]+'m ');
	    		$('.hist_list').append(div);
				div.append(obj0);
	    		div.append(obj1);
	    		div.append(obj2);
	    		div.append(obj3);
	    		
	    		if(i>=data.length)break;
    		};
   		}; 
   	};
});


