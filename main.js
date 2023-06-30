song1 = "";
song2 = "";
song3 = "";
song4 = "";
song5 = "";
song6 = "";
song = "";
count = 0
function preload() {
	song1 = loadSound("https://tifansun.github.io/DJ-AI/EarthIsland_MySingingMonsters.mp3");
	song2 = loadSound("https://tifansun.github.io/DJ-AI/AirIsland_MySingingMonsters.mp3");
	song3 = loadSound("https://tifansun.github.io/DJ-AI/FireHaven_MySingingMonsters.mp3");
	song4 = loadSound("https://tifansun.github.io/DJ-AI/ColdIsland_MySingingMonsters.mp3");
	song5 = loadSound("https://tifansun.github.io/DJ-AI/MagicalSanctum_MySingingMonsters.mp3");
	song6 = loadSound("https://tifansun.github.io/DJ-AI/WaterIsland_MySingingMonsters.mp3");
	song = song1
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;
bandera = false;
function setup() {
	canvas = createCanvas(600, 500);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
	if (results.length > 0) {
		scoreRightWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
	}
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	if (scoreLeftWrist > 0.2) {
		fill("#FF0000");
		stroke("#FF0000");
		circle(leftWristX, leftWristY, 20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY * 2);
		leftWristY_divide_1000 = 1 - (new_leftWristY / 1000);
		leftWristY_divide_1000 = Math.round(leftWristY_divide_1000 * 10) / 10
		document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
		song.setVolume(leftWristY_divide_1000);
	}

	if (scoreRightWrist > 0.2) {
		fill("#0000FF");
		stroke("#0000FF");
		circle(rightWristX, rightWristY, 20);
		if (rightWristX > 400 && !bandera) {
			stop();
			bandera = true
			count++;
			if (count == 0) {
				song = song1
			} else if (count == 1) {
				song = song2
			} else if (count == 2) {
				song = song3
			} else if (count == 3) {
				song = song4
			} else if (count == 4) {
				song = song5
			} else if (count == 5) {
				song = song6
			} else if (count > 5) {
				count = 0
				song = song1
			}
			console.log(count);
			play();
		}

		if (rightWristX < 200 && !bandera) {
			stop();
			bandera = true
			count--;
			if (count == 0) {
				song = song1
			} else if (count == 1) {
				song = song2
			} else if (count == 2) {
				song = song3
			} else if (count == 3) {
				song = song4
			} else if (count == 4) {
				song = song5
			} else if (count == 5) {
				song = song6
			} else if (count < 0) {
				count = 5
				song = song6
			}
			console.log(count);
			play();
		}
	}
	else {
		bandera = false
	}
}

function play() {
	if (!song.isPlaying()) {
		song.play();
		song.setVolume(1);
		song.rate(1);
		info()
	}

}

function stop() {
	song.stop();
}

function info() {
	if (count == 0) {
		document.getElementById("album").src = "Earth_Island.webp";
		document.getElementById("cancion").innerText = "Earth island - My singing Monsters"
	} else if (count == 1) {
		document.getElementById("album").src = "Air_Island.webp";
		document.getElementById("cancion").innerText = "Air island - My singing Monsters"
	} else if (count == 2) {
		document.getElementById("album").src = "Refugio_de_Fuego_miniatura.webp";
		document.getElementById("cancion").innerText = "Fire Haven - My singing Monsters"
	} else if (count == 3) {
		document.getElementById("album").src = "Cold_Island.webp";
		document.getElementById("cancion").innerText = "Cold island - My singing Monsters"
	} else if (count == 4) {
		document.getElementById("album").src = "Magical_Sanctum.webp";
		document.getElementById("cancion").innerText = "Magical Sanctum - My singing Monsters"
	} else if (count == 5) {
		document.getElementById("album").src = "Water_Island.webp";
		document.getElementById("cancion").innerText = "Water island - My singing Monsters"
	} else {
		document.getElementById("album").src = "5115607.png";
		document.getElementById("cancion").innerText = "nada - nadie"
	}
}
