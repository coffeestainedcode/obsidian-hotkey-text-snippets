import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MyPluginSettings {
	mySetting: Object;
}

interface SavedData {
    snippet: String,
    modifiers: Array<String>,
    key: String
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: {}
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

        this.addCommand({
            id: "shortcut-HTML-break",
            name: "Shortcut for <br>",
            callback: () => this.insertSnippet("<br>"),
            hotkeys: [
              {
                modifiers: ["Mod"],
                key: "1",
              },
            ],
        });

        this.addCommand({
            id: "shortcut-Recall-snippet",
            name: "Shortcut for Recall block quote",
            callback: () => this.insertSnippet(
                "> ##### Recall:\n> "
            ),
            hotkeys: [
              {
                modifiers: ["Mod"],
                key: "2",
              },
            ],
        });


		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

    insertSnippet(input: String): void {
        let activeLeaf : any = this.app.workspace.activeLeaf;
        let editor = activeLeaf.view.sourceMode.cmEditor;
        editor.replaceSelection(input);
    }
}

// class SettingTab extends PluginSettingTab {
// 	plugin: MyPlugin;

// 	constructor(app: App, plugin: MyPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		let {containerEl} = this;

// 		containerEl.empty();

// 		containerEl.createEl('h2', {text: 'Hotkey Bindings'});
//         containerEl.createEl('div', {text: 'Use CTRL, OPT, CMD, or SHF for modifiers'})

//         for (let index = 0; index < Object.keys(this.plugin.settings.mySetting).length + 1; index++) {
//             new Setting(containerEl)
//                 .setName('Keybinding #' + (index + 1)) // keybinding count
//                 // .setDesc('It\'s a secret') // what the snippet is
                
//                 .addText(text => text
//                     .setPlaceholder('Enter Keybindings and Snippet\nex) CTRL,SHIFT "Inserted text!"') 
//                     // .setValue(this.plugin.settings.mySetting) // current keeybinding
//                 )
//                 .addButton(click => click
//                     .setButtonText("test")
//                     )
//         }
// 	}
// }
