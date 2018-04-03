<?php

/*
* Jobstreet Job List Crawler
* Scrap data from jobstreet and save it as csv , just enter the jobstreet URL and you're good to go
* By: KelNovi123
*/

$fh = fopen('CSV/'.$_POST['filename'], "w");

fwrite($fh, $_POST['csv']);

fclose($fh);

//change permission by dev for editing purposes
chmod('CSV/'.$_POST['filename'], 0777);
