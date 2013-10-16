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

var statArray=null;
getStatObjFromDate=function(strDate){
	timestamp=(new Date(strDate)).getTime()
	for (var i = 0; i < statArray.length; i++) {
		if(timestamp>=statArray[i].timeFrom&&timestamp<statArray[i].timeTo)
			return statArray[i]
	};
	return null
}
/*
$(document).ready(function() {
	d3.csv("http://junsuwhy.github.io/swim-to-green-island/data.csv",function(){
		console.log("yo");
	})
});

*/
$(document).ready(function() {
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","data.csv",true);
	xmlhttp.send();
	
	xmlhttp.onreadystatechange=function(e){
		if(xmlhttp.readyState==4){
			xmlDoc=xmlhttp.responseText;
			//var data = $.csv.toArray(xmlDoc);
			var dataRaw=xmlDoc.split(/\n/);

			var total_dist=0;
			//加總的距離

			var data_idx=1;
			//目前統計到的筆數

			var level=0;
			//任務目標，0為龜山島

			var end=false;

			var is_next_target=false;

			statArray=[];
			today=new Date();
			var CountTimeFrom=(new Date(dataRaw[1].split(",")[0])).getTime();
			do{
				day=new Date(CountTimeFrom);
				var statCurr={
					timeFrom:CountTimeFrom,  //2013/8/1 timestamp
					timeTo:nextMonthFirstDay(CountTimeFrom).getTime(),	//2013/9/1  timestamp
					timeTag:ad(day.getYear())+"年"+(day.getMonth()+1)+"月",   //"2013,8月"
					lastDist:0,     //這個月加進去之前總合的距離
					duraDist:0,		//這個月共游多少距離
					totalDist:0,	//算到這個月完總計多少
					archiveTarget:[]//如果這個月有達成目標的話, 是什麼?
				}	
				statArray.push(statCurr);
				CountTimeFrom=statCurr.timeTo;

			}while(statCurr.timeTo<today.getTime());
			//console.log(statArray);
		

	    	var jq_history=$('#history');
	    	jq_history.children().filter('.his_target').remove();

	    	while(true){

	    		var jq_his_target=$('<div>').addClass('his_target');
	    		jq_history.append(jq_his_target);
	    		var jq_targ_title=$('<div>').addClass('targ_title');
	    		jq_his_target.append(jq_targ_title);
	    		//console.log(level);
	    		jq_targ_title.append('游向'+target[level].to+' 共計'+target[level].dist+'m ');

	    		if(data_idx>=dataRaw.length)break;

	    		var last_dist=target[level]["dist"];
	    		//以下為有資料時的情況

	    		while(true){
	    			//statArray,statCurr這裡要用到了
	    			//整理之後最後丟到data_visualize


	    			//資料處理
	    			obj=dataRaw[data_idx].split(',');

	    			if(obj[0]){
		    			//總距離
		    			//console.log('total_dist:',total_dist);
						total_dist+=parseInt(obj[1]);
						//剩餘距離
			    		last_dist=target[level].dist-total_dist;

			    		statObj=getStatObjFromDate(obj[0]);
			    		statObj.duraDist+=parseInt(obj[1]);

		    			var jq_div_hist_list=$('<div></div>');
		    			jq_div_hist_list.addClass('hist_list');
			    		jq_his_target.append(jq_div_hist_list);

			    		var list_date=$('<span>').addClass('date').append(obj[0]+' ');
						jq_div_hist_list.append(list_date);
			    		var list_one_dist=$('<span>').addClass('one_dist').append(obj[1]+'m ');
			    		jq_div_hist_list.append(list_one_dist);
			    		jq_div_hist_list.append($("<span>").addClass("total_tag").append("總計"));
			    		var list_total_dist=$('<span>').addClass('total_dist').append(total_dist+'m ');
			    		jq_div_hist_list.append(list_total_dist);
			    		var list_last_dist=$('<span>').addClass('archive_text');
			    		jq_div_hist_list.append(list_last_dist);


	    			}
	    			
		    		if(last_dist<=0){
	    				is_next_target=true;
	    				list_last_dist.append('到達'+target[level].to);
	    				statObj.archiveTarget.push(level);

	    				level++;
	    				data_idx++;
		    			if(data_idx>=dataRaw.length){
		    				end=true;
		    			};


		    			break;
		    		}else{
		    			if(list_last_dist){
			    			list_last_dist.append('<span class="last_tag">剩餘</span>');
			    			list_last_dist.append('<span class="last_dist">'+last_dist+'m </span>');
		    			}
		    		};

		    		jq_div_hist_list=null;
		    		list_date=null;
		    		list_one_dist=null;
		    		list_total_dist=null;
		    		list_last_dist=null;

		    		data_idx++;
		    		if(data_idx>=dataRaw.length){
		    			end=true;
		    			break;
		    		};
	    		};


	    		jq_history.append('<div class="clear"></div>')
	    		if(end){
	    			break;
	    		};


    		};

    		statArray[0].totalDist+=statArray[0].duraDist;
			for (var i = 1; i < statArray.length; i++) {
					statObj=statArray[i];
					statObj.lastDist=statArray[i-1].totalDist
					statObj.totalDist=statObj.duraDist+statObj.lastDist;
				};

     		$('#curr_target').html(target[level].to);
     		last_dist=target[level].dist-total_dist;
     		$('#curr_targ_dist').html(String(last_dist));
     		

   			data_visualize(statArray);
   		}; 


   	};
});

