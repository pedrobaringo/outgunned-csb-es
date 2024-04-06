Hooks.once("init", function() {
    console.log("Incializando módulo Outgunned")

    game.settings.register("outgunned-csb-es", "firstTimeStart", {
        name: "Forzar mensaje de Bienvenida",
        hint: "Si marcas esta casilla te aparecerá el mensaje de bienvenida en el chat la próxima vez que entres.",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    })
})

Hooks.once("ready", function() {
	let buttonId=Date.now();
	let buttonId2=Date.now()+2;
	let mensbienv='<h1>Bienvenido al módulo de Outgunned</h1>';
	let mensimpfirst='<p>Importa los compendios para poder empezar a usar el módulo</p><button id='+buttonId2+' >Importa los compendios</button>';
	let mensimpact='<p>Se ha actualizado el módulo desde la última vez que lo usaste. Importa los compendios para tener la última versión de las Templates de actores y objetos.</p><button id='+buttonId2+' >Importa los compendios</button>'
	let mensrecordtut='<p>Recuerda: Puedes seleccionar un Campo distinto o añadir dados de bonificación o penalización, si pulsas la tecla Mayus al hacer click en la Habilidad.</p><button id='+buttonId+' >Ve al Tutorial</button>';
	
	let forzarbienvenida=game.settings.get("outgunned-csb-es", "firstTimeStart");
	let forzarmensaje;
	console.log(forzarmensaje);
	if (forzarbienvenida==true) {
		forzarmensaje=true;
	}
	let versactual=game.modules.get("outgunned-csb-es").version;
	let userisGM=game.user.isGM;
	if (userisGM) {
		if(!game.user.getFlag("outgunned-csb-es", "welcomeMessage") || forzarmensaje==true) {
			game.settings.set("custom-system-builder", "customStyle", "modules/outgunned-csb-es/assets/1999.css");
			let msg=mensbienv+mensimpfirst+mensrecordtut;
			ChatMessage.create({
        		speaker: {alias:"Outgunned"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/outgunned-csb-es')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection = game.packs.get("outgunned-csb-es.objecttemplates");
						console.log(collection);
						console.log(button2);
						let folderident=''
						if (game.folders.getName("Templates Objetos")) {
							folderident=game.folders.getName("Templates Objetos").id;
						}
						let docs = collection.importAll({folderId: folderident, folderName: "Templates Objetos", keepId: true});
						setTimeout(() => {
							let collection2 = game.packs.get("outgunned-csb-es.actortemplates");
							let folderident2=''
							if (game.folders.getName("Templates Actores")) {
								folderident2=game.folders.getName("Templates Actores").id;
							}
							let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates Actores", keepId: true});
							let collection3 = game.packs.get("outgunned-csb-es.macros-outgunned");
							let folderident3=''
							if (game.folders.getName("Macros Outgunned")) {
								folderident3=game.folders.getName("Macros Outgunned").id;
							}
							let docs3 =  collection3.importAll({folderId: folderident3, folderName: "Macros Outgunned", keepId: true});
						}, 500);
						game.user.setFlag("outgunned-csb-es", "welcomeMessage", true);
						game.user.setFlag("outgunned-csb-es", "lastVersion", game.modules.get("outgunned-csb-es").version);
					});
				}
				}, 100);
			});
			game.settings.set("outgunned-csb-es", "firstTimeStart", false);
		} else if (versactual!=game.user.getFlag("outgunned-csb-es", "lastVersion")) {
			let msg=mensbienv+mensimpact+mensrecordtut;
			ChatMessage.create({
					speaker: {alias:"Outgunned"},
					content: msg,
			   whisper : ChatMessage.getWhisperRecipients(game.user.name)
			}).then(() => {
				setTimeout(() => {
				function openInNewTab(url) {
					const win = window.open(url, '_blank');
					win.focus();
				}
				const button = document.getElementById(buttonId);
				if (button) {
					button.addEventListener("click",function () {
						openInNewTab('https://github.com/pedrobaringo/outgunned-csb-es')
					});
				}
				const button2 = document.getElementById(buttonId2);
				if (button2) {
					button2.addEventListener("click",function () {
						let collection = game.packs.get("outgunned-csb-es.objecttemplates");
						console.log(collection);
						console.log(button2);
						let folderident=''
						if (game.folders.getName("Templates Objetos")) {
							folderident=game.folders.getName("Templates Objetos").id;
						}
						let docs = collection.importAll({folderId: folderident, folderName: "Templates Objetos", keepId: true});
						setTimeout(() => {
							let collection2 = game.packs.get("outgunned-csb-es.actortemplates");
							let folderident2=''
							if (game.folders.getName("Templates Actores")) {
								folderident2=game.folders.getName("Templates Actores").id;
							}
							let docs2 =  collection2.importAll({folderId: folderident2, folderName: "Templates Actores", keepId: true});
							let collection3 = game.packs.get("outgunned-csb-es.macros-outgunned");
							let folderident3=''
							if (game.folders.getName("Macros Outgunned")) {
								folderident3=game.folders.getName("Macros Outgunned").id;
							}
							let docs3 =  collection3.importAll({folderId: folderident3, folderName: "Macros Outgunned", keepId: true});
						}, 500);
						game.user.setFlag("outgunned-csb-es", "lastVersion", game.modules.get("outgunned-csb-es").version);
					});
				}
				}, 500);
			});
		}
	} else if (!game.user.getFlag("outgunned-csb-es", "welcomeMessage") || forzarmensaje==true) {
		let msg = mensbienv+mensrecordtut;
		ChatMessage.create({
        		speaker: {alias:"Outgunned"},
        		content: msg,
				whisper : ChatMessage.getWhisperRecipients(game.user.name)
		}).then(() => {
			setTimeout(() => {
			function openInNewTab(url) {
				const win = window.open(url, '_blank');
				win.focus();
			}
			const button = document.getElementById(buttonId);
			if (button) {
				button.addEventListener("click",function () {
					openInNewTab('https://github.com/pedrobaringo/outgunned-csb-es');
				});
			}
			}, 100);
		});
		game.user.setFlag("outgunned-csb-es", "welcomeMessage", true);
		game.settings.set("outgunned-csb-es", "firstTimeStart", false);
	}
})