window.addEventListener("load", function () {
	"use strict";
	
	// var w = 800, h = 800;
	var w = $(window).width(), h = $(window).height();
	
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(w, h);
	var view = document.getElementById("view");
	view.appendChild(renderer.domElement);
	
	var camera = new THREE.PerspectiveCamera(35, w / h, 1, 1000);
	camera.position.set(200, 200, 100);
	var controls = new THREE.TrackballControls(camera, view);
	
	var scene = new THREE.Scene();
	scene.add(new THREE.AmbientLight(0x666666));
	
	var light1 = new THREE.DirectionalLight(0xffffff);
	light1.position.set(0, 100, 100);
	scene.add(light1);
	
	var light2 = new THREE.DirectionalLight(0xffffff);
	light2.position.set(0, -100, -100);
	scene.add(light2);
	
	var mat = new THREE.MeshPhongMaterial({
		// color: 0x339900, ambient: 0x339900, specular: 0x030303,
		color: 0xe8e8e8, ambient: 0xe8e8e8, specular: 0x030303,
	});
	var obj = new THREE.Mesh(new THREE.Geometry(), mat);
	scene.add(obj);
	
	var loop = function loop() {
		requestAnimationFrame(loop);
		//obj.rotation.z += 0.05;
		controls.update();
		renderer.clear();
		renderer.render(scene, camera);
	};
	loop();
	
	
	// file load
	var openFile = function (file) {
		var reader = new FileReader();
		reader.addEventListener("load", function (ev) {
			var buffer = ev.target.result;
			var geom = loadStl(buffer);
			scene.remove(obj);
			obj = new THREE.Mesh(geom, mat);
			scene.add(obj);
		}, false);
		reader.readAsArrayBuffer(file);
	};
	var openFile_from_url = function (file) {
		var request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.responseType = 'blob';
		request.onload = function() {
			var reader = new FileReader();
			reader.readAsArrayBuffer(request.response);
			
			reader.addEventListener("load", function (ev) {
				var buffer = ev.target.result;
				var geom = loadStl(buffer);
				scene.remove(obj);
				obj = new THREE.Mesh(geom, mat);
				scene.add(obj);
			}, false);
			// reader.onload =  function(e){
				// console.log('DataURL:', e.target.result);
			// };
		};
		request.send();
	};
// openFile_from_url("http://localhost:58906/sampleSTL.stl");
openFile_from_url("sampleSTL.stl");






	/*
	// file input button
	var input = document.getElementById("file");
	input.addEventListener("change", function (ev) {
		var file = ev.target.files[0];
		openFile(file);
	}, false);
	
	// dnd
	view.addEventListener("dragover", function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "copy";
	}, false);
	view.addEventListener("drop", function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var file = ev.dataTransfer.files[0];
		openFile(file);
	}, false);
	*/
	
	
	/*
	function OnFileImageEntry(file) {
		window.resolveLocalFileSystemURL("http://localhost:58906/sampleSTL.stl", function(fileEntry){
			console.log(fileEntry.name);
		}, function(error){
		 console.log('about to resolve this files errors');
			console.log(error.code);
		});
		*.
		/*
		window.resolveLocalFileSystemURL(i, function (fileEntry) {
			fileEntry.file(function (file) {
				console.log('Now I have a file obj.');	
						
				reader.addEventListener("load", function (ev) {
					var buffer = ev.target.result;
					var geom = loadStl(buffer);
					scene.remove(obj);
					obj = new THREE.Mesh(geom, mat);
					scene.add(obj);
				}, false);
				reader.readAsArrayBuffer(file);
			}, function (e) {
				console.log('Error getting file', e);
			});
		}, function (e) {
			console.log('Error resolving fs url', e);
		});
	}
	
	// OnFileImageEntry("http://localhost:58906/sampleSTL.stl");
	// OnFileImageEntry("sampleSTL.stl");
	*/
	
}, false);
