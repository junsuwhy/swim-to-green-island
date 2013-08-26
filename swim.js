var target=[{
		"from":"梗枋魚港","to":"龜山島","dist":9100
	},{
		"from":"台東","to":"綠島","dist":33000
	},{
		"from":"台灣","to":"澎湖","dist":50000
	},{
		"from":"台東","to":"蘭嶼","dist":90000
	},{
		"from":"","to":"台灣海峽最窄處","dist":130000
	},{
		"from":"","to":"巴士海峽平均","dist":185000
	}
];


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

			var data_idx=1;
			//目前統計到的筆數

			var level=0;
			//任務目標，0為龜山島

			var end=false;

			var is_next_target=false;

			
	    	var jq_history=$('#history');
	    	jq_history.children().filter('.his_target').remove();

	    	while(true){

	    		var jq_his_target=$('<div></div>').addClass('his_target');
	    		jq_history.append(jq_his_target);
	    		var jq_targ_title=$('<div></div>').addClass('targ_title');
	    		jq_his_target.append(jq_targ_title);
	    		console.log(level);
	    		jq_targ_title.append('游向'+target[level].to+' 共計'+target[level].dist+'m ');

	    		if(data_idx>=data.length)break;

	    		var last_dist=target[level]["dist"];
	    		//以下為有資料時的情況

	    		while(true){
	    			//資料處理
	    			obj=data[data_idx].split(',');
	    			//總距離
	    			console.log('total_dist:',total_dist);
					total_dist+=parseInt(obj[1]);
					//剩餘距離
		    		last_dist=target[level].dist-total_dist;


	    			var jq_div_hist_list=$('<div></div>');
	    			jq_div_hist_list.addClass('hist_list');
		    		jq_his_target.append(jq_div_hist_list);

		    		var list_date=$('<div></div>').addClass('date').append(obj[0]+' ');
					jq_div_hist_list.append(list_date);
		    		var list_one_dist=$('<div></div>').addClass('one_dist').append(obj[1]+'m ');
		    		jq_div_hist_list.append(list_one_dist);
		    		var list_total_dist=$('<div></div>').addClass('total_dist').append('總計'+total_dist+'m ');
		    		jq_div_hist_list.append(list_total_dist);
		    		var list_last_dist=$('<div></div>').addClass('last_dist');
		    		jq_div_hist_list.append(list_last_dist);

		    		if(last_dist<=0){
	    				is_next_target=true;
	    				list_last_dist.append('到達'+target[level].to);
	    				level++;
	    				data_idx++;
		    			if(data_idx>=data.length){
		    				end=true;
		    			};

		    			break;
		    		}else{
		    			list_last_dist.append('剩餘'+last_dist+'m ');
		    		};

		    		jq_div_hist_list=null;
		    		list_date=null;
		    		list_one_dist=null;
		    		list_total_dist=null;
		    		list_last_dist=null;

		    		data_idx++;
		    		if(data_idx>=data.length){
		    			end=true;
		    			break;
		    		};
	    			
	    		};


	    		jq_history.append('<div class="clear"></div>')
	    		if(end){
	    			break;
	    		}


    		};


     		$('#curr_target').html(target[level].to);
     		last_dist=target[level].dist-total_dist;
     		$('#curr_targ_dist').html(String(last_dist));
     		

   		data_visualize(data);
   		}; 


   	};
});


