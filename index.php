<!DOCTYPE html>
<html>
   <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<link rel="stylesheet" type="text/css" href="https://www.jqueryscript.net/demo/Fullscreen-Loading-Modal-Indicator-Plugin-For-jQuery-loadingModal/css/jquery.loadingModal.css">
	<title>Jobstreet Crawler</title>
</head>
<body>


<!-- /*
* Jobstreet Job List Crawler
* Scrap data from jobstreet and save it as csv , just enter the jobstreet URL and you're good to go
* By: KelNovi123
*/ !-->

<div class="container" style="margin-top: 100px;">
	<div class="row">
		<div class="col-md-12">

			<div class="well">

			<h3>Jobstreet Joblist Crawler</h3>

			<label> Enter Jobstreet URL</label>
			<input class="form-control" type="text" name="url" id="url" value="https://www.jobstreet.com.ph/en/job-search/job-vacancy.php?key=nanny&location=&specialization=&area=&salary=&ojs=3&src=12" />
			

			<label>Enter Filename:</label>
			<input class="form-control"  type="text" name="filename" id="filename" value="data.csv" />


			<button id="crawl" class="btn btn-primary" style="margin-top: 20px;">
				<i class="fa fa-cloud-download"></i> Crawl Page and Get CSV
			</button>


			<div class="status">
				
			</div>

			<div class="text-center">
				Made with <i class="fa fa-heart" style="color:red;"></i> by <a href="https://github.com/heyitsnovi">KelNovi123</a>
			</div>

			</div>

		</div>
	</div>
</div>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="https://www.jqueryscript.net/demo/Fullscreen-Loading-Modal-Indicator-Plugin-For-jQuery-loadingModal/js/jquery.loadingModal.js"></script>
<script type="text/javascript" src="crawler.js"></script>
</body>
</html>
