arrStat=[];

data_visualize=function(data){

	console.log(data);


	//arrStat=[];
	for (var i = 1; i < data.length; i++) {
		arrData=data[i].split(",");

		objStat=null;
		for (var j = 0; j < arrStat.length; j++) {
			if((new Date(arrData[0])).getTime()>= arrStat[j].timeFrom &&
			   (new Date(arrData[0])).getTime()< arrStat[j].timeTo){
				objStat=arrStat[j]; 
				break;
			   };

		};

		if(objStat==null){
			arr=arrData[0].split("/");
			dataMonth=parseInt(arr[1]);
			dataMonth=(Math.floor(dataMonth/3)*3)+1;
			str=arr[0]+"/"+dataMonth.toString()+"/"+arr[1]
			date=new Date(str);
			nextSeasonDate=nextSeasonFirstDay(str);

			objStat={
				
				timeFrom:date.getTime(),
				timeTo:nextSeasonDate.getTime(),
				strYear:ad(date.getYear())+"年",
				strSeason:"第"+Math.floor((date.getMonth()+3)/3)+"季",
				name:function(){return this.strYear+this.strSeason},
				totalDist:0,
				totalCount:0
			}
			arrStat.push(objStat)
		}
		//已經有了objStat
		objStat.totalCount+=1;
		objStat.totalDist+=parseInt(arrData[1]);



	};
	for (var i = 0; i < arrStat.length; i++) {
		console.log(arrStat[i].name);
		console.log("游了"+arrStat[i].totalCount+"次");
		console.log("游了"+arrStat[i].totalDist+"公尺");
	};






	//設定全域變數
	width=800;
	height=300;
	padding=70;
	filler="2:1";
	arrFil=[];
	arrFil[0]=parseInt(filler[0]);
	arrFil[1]=parseInt(filler[2]);
	em=16;

	center={
		x:padding,
		y:height-padding
	}
	xlength=width-2*padding;
	ylength=height-2*padding;

	unitWidth=function(arr){return xlength/arr.length};
	rectWidth=function(arr){return arrFil[1]*unitWidth(arr)/(arrFil[0]+arrFil[1])};
	offsetWidth=function(arr){return arrFil[0]*unitWidth(arr)/(arrFil[0]+arrFil[1])};

		//取得最大值
		arrMax=function(){
			max=arr[0].totalDist
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].totalDist>max)max=arr[i];
			};
			return max;
		}


	main=function(){

		//初使化
		$("#graph").append('<svg>');
		$svg=d3.select('#graph svg');
		$svg.attr('width',width).attr('height',height);
		$g1=$svg.append("g").attr('id','group1').selectAll('#group1');

		//指定要代入的資料矩陣是什麼
		arr=arrStat;
		//arr=arrCmetOverCmeo("h");
		//console.log(arr);


		$g1data=$g1.data(arr).enter();

		$g1data.append('rect')
			.attr('x',function(d,i){
				return padding+i*unitWidth(arr)-rectWidth(arr);
			})
			.attr('y',function(d,i){
				return height-padding;
			})
			.attr('width',function(d,i){
				return rectWidth(arr)
			})
			.attr("height",0)
			.transition()
			.duration(3000)
			.attr('y',function(d,i){
				return height-padding-(d.totalDist)*ylength/arrMax(arr);
			})
			.attr('height',function(d,i){
				return (d.totalDist)*ylength/arrMax(arr)
			})
			.attr('fill','#A5DEE4');

		//加入tag的字
		$g1data.append('text').text(function(d,i){return d.name()})
			.attr('x',function(d,i){
				return padding+i*unitWidth(arr)-(1.5)*rectWidth(arr);
			})
			.attr('y',function(d,i){
				return height-padding+em;
			})
			.attr('color','#7B90D2');

		//加入value的字
		$g1data.append('text').text(function(d,i){return d.totalDist+"公尺"})
			//.attr('x',function(d,i){
			//	return padding+i*xlength/arr.length-2*5;
			//})
			//.attr('y',function(d,i){
			//	return height-padding-d*ylength/arrMax(arr);
			//})
			.attr('transform',function(d,i){
				str="";
				str+='translate(';
				str+=(padding+i*unitWidth(arr));
				str+=',';
				str+=(height-padding-(d.totalDist)*ylength/arrMax(arr))-em;
				str+=')';
				str+='rotate(-90)';
				return str;
			});


	};

	main();

}