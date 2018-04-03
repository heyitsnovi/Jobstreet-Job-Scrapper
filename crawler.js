/*
* Jobstreet Job List Crawler
* Scrap data from jobstreet and save it as csv , just enter the jobstreet URL and you're good to go
* By: KelNovi123
*/

$(document).ready(function(){


	$('#crawl').on('click',function(){

		showModal();

		var jobs = [];

		jQuery.ajax({

			url: "curlscrapper.php",
			type: "POST",
			data:{
				url: $('#url').val()
			},
			success:function(r){

				var e = JSON.parse(r);

				var d = $(e.htmlcontents).contents().find('.panel');

				var csvheaders = "\"JOB TITLE\",\"LOCATION\",\"RECRUITMENT AGENCY\",\"JOB URL\",\"JOB DESC\",\"COMPANY OVERVIEW\",\"COMPANY LOGO\",\"WEBSITE\",\"FB\",\"SALARY MIN\",\"SALARY MAX\",\"EXP DATE\",\n";

				var joblist = '';


				$(d).each(function(z){

				 


					if(typeof $(this).contents().find('.position-title > .position-title-link > h2').html()!=='undefined'){


						if( jQuery.inArray( $(this).contents().find('.position-title > .position-title-link > h2').html(), jobs )){

						jobs.push(

							$(this).contents().find('.position-title > .position-title-link > h2').html()

						);

				 
						 
							joblist+="\""+
								$(this).contents().find('.position-title > .position-title-link > h2').html()+"\","+"\""+
								$(this).contents().find('.job-location > span').html()+"\","+"\""+
								$(this).contents().find('.company-name > a > span').html()+"\",\""+
								$(this).contents().find(".position-title-link").attr('href')+"\",\""+get_job_description($(this).contents().find(".position-title-link").attr('href'))+"\",\""+
									get_company_overview($(this).contents().find(".position-title-link").attr('href'))+"\",\""+get_company_logo($(this).contents().find(".position-title-link").attr('href'))+"\",\""+get_website($(this).contents().find(".position-title-link").attr('href'))+"\",\""+get_facebook($(this).contents().find(".position-title-link").attr('href'))+"\",\""+get_salary_range($(this).contents().find(".position-title-link").attr('href'),'min')+"\",\""+get_salary_range($(this).contents().find(".position-title-link").attr('href'),'max')+"\",\""+get_job_expiration($(this).contents().find(".position-title-link").attr('href'))+"\" \n";
								
					 

						}
						 
					}

				}); 

				generate_csv(csvheaders+joblist);

			}

		});

	});


	function get_facebook(joburl){

		var o ;

		var ht = jQuery.ajax({

			url : "getfb.php",
			data:{

				job_url : joburl
			},
			type: 'POST',
			async: false
		}).responseText;


		o = JSON.parse(ht);

		if(typeof $(o.fb).contents().find('#company_facebook').html()!=='undefined'){

			return $(o.fb).contents().find('#company_facebook').html();
		}else{
			return '';
		}
	}


	function get_website(joburl){

		var o ;

		var ht = jQuery.ajax({

			url : "gettw.php",
			data:{

				job_url : joburl
			},
			type: 'POST',
			async: false
		}).responseText;


		o = JSON.parse(ht);

		if(typeof $(o.web).contents().find('#company_website').html() !=='undefined'){
			return $(o.web).contents().find('#company_website').html();
		}else{
			return '';
		}
	}


	function get_job_expiration(joburl){
				var o ;
				var strtofind = '';
				var stringpipe = '';
				var formatted_date = '';

				var ht = jQuery.ajax({

					url : "getjobdesc.php",
					data:{

						job_url : joburl
					},
					type: 'POST',
					async: false
				}).responseText;


				o = JSON.parse(ht); 


				if( $(o.job_contents).contents().find('#closing_date').html().replace("Closing on ","").trim().indexOf('|') >= 0){
				
				stringpipe =  $(o.job_contents).contents().find('#closing_date').html().replace("Closing on ","").trim().split('|');


				formatted_date =  stringpipe[1].trim().split('-');

				return formatted_date[2]+'-'+convert_date_to_num(formatted_date[1])+'-'+formatted_date[0];

				}else{

				var tst = $(o.job_contents).contents().find('#closing_date').html().replace("Closing on ","").trim().split('-');

					return tst[2]+"-"+convert_date_to_num(tst[1])+"-"+tst[0];
				}

	}


	function convert_date_to_num(date){

		var date_num = '';

		switch(date){

			case 'January':
				 date_num = '01';
			break;

			case 'February':
				date_num = '02';
			break;

			case 'March':
				date_num ='03';
			break;

			case 'April':
				date_num = '04';
			break;

			case 'May':
				date_num = '05';
			break;

			case 'June':
				date_num = '06';
			break;

			case 'July':
				date_num = '07';
			break;

			case 'August':
				date_num = '08';
			break;

			case 'September':
				date_num = '09';
			break;

			case 'October':
				date_num = '10';
			break;

			case 'November':
				date_num = '11';
			break;

			case 'December':
				date_num = '10';
			break;

			default:

			break;

		}

		return date_num;

	}

	function get_job_description(joburl){

				var o ;
				var strtofind = '';

				var ht = jQuery.ajax({

					url : "getjobdesc.php",
					data:{

						job_url : joburl
					},
					type: 'POST',
					async: false
				}).responseText;


				o = JSON.parse(ht); 

				var st = o.job_contents.substring(o.job_contents.lastIndexOf("\"JobAd.Salary\":\"")+1,o.job_contents.lastIndexOf("\"};"));

				var jobrange = '';

				if(typeof st !=='undefined'){

					jobrange = st.replace("JobAd.Salary\":\"","").split("-");


				}
	
				return $(o.job_contents).contents().find('#job_description').html();

	}


	function get_salary_range(joburl,type){



			var o ;
			var strtofind = '';

			var ht = jQuery.ajax({

				url : "getjobdesc.php",
				data:{

					job_url : joburl
				},
				type: 'POST',
				async: false
			}).responseText;


			o = JSON.parse(ht); 

			var st = o.job_contents.substring(o.job_contents.lastIndexOf("\"JobAd.Salary\":\"")+1,o.job_contents.lastIndexOf("\"};"));

			var jobrange = '';

			if(typeof st !=='undefined'){

				jobrange = st.replace("JobAd.Salary\":\"","").split("-");

				if(type=='min'){

					return jobrange[0];
				}else{
					return jobrange[1];
				}
				
			}

	}


	function get_company_logo(joburl){


			var o ;

			var ht = jQuery.ajax({

				url : "getcompanylogo.php",
				data:{

					job_url : joburl
				},
				type: 'POST',
				async: false
			}).responseText;


			o = JSON.parse(ht);

			if($(o.company_logo).contents().find('#company_logo').attr('data-original')!=='undefined'){
				return  $(o.company_logo).contents().find('#company_logo').attr('data-original');	
			}else{
				return '';
			}
			
	}


	function get_company_overview(joburl){


			var o ;

			var ht = jQuery.ajax({

				url : "getcompanyinfo.php",
				data:{

					job_url : joburl
				},
				type: 'POST',
				async: false
			}).responseText;


			o = JSON.parse(ht);

			return "";

	}


	function generate_csv(data){

		jQuery.ajax({

			url : 'jbcsv.php',
			type: 'POST',
			data:{
				csv: data,
				filename: $("#filename").val()
			},
			success:function(r){

				$('body').loadingModal('hide');
				$('.status').html("<br><div class='alert alert-success'><strong>Success</strong><p>Job Done.Download the CSV <a href='"+window.location.href+"CSV/"+$('#filename').val()+"'>here</a></p></div>");
			}
		})
	}


    function showModal() {

    	$('.status').html("");
        $('body').loadingModal({text: 'Crawling Data...'});

        var delay = function(ms){ return new Promise(function(r) { setTimeout(r, ms) }) };
        var time = 2000;

        delay(time)
                .then(function() { $('body').loadingModal('animation', 'rotatingPlane').loadingModal('backgroundColor', 'red'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'wave'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'wanderingCubes').loadingModal('backgroundColor', 'green'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'spinner'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'chasingDots').loadingModal('backgroundColor', 'blue'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'threeBounce'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'circle').loadingModal('backgroundColor', 'black'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'cubeGrid'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'fadingCircle').loadingModal('backgroundColor', 'gray'); return delay(time);})
                .then(function() { $('body').loadingModal('animation', 'foldingCube'); return delay(time); } )
                .then(function() { $('body').loadingModal('color', 'black').loadingModal('text', 'Done :-)').loadingModal('backgroundColor', 'yellow');  return delay(time); } )
                .then(function() { $('body').loadingModal('hide'); return delay(time); } )
                .then(function() { $('body').loadingModal('destroy') ;} );
    }

});
