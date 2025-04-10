export class Dialog {
    /**
     * creates a new instance of Dialog.
     * @param {Phaser.Scene} scene - the scene where the dialog will be displayed.
     * @param {object} config - configuration options for the dialog box.
     *   expected keys: x, y, width, height, boxColor, borderColor, padding, font, fontFill.
     */
    constructor(scene, config = {}) {
      this.scene = scene;
      this.dialogLines = [];
      this.currentLineIndex = 0;
      this.currentCharIndex = 0;
      this.dialogTyping = false;
      this.typingEvent = null;
      
      // use defaults if config properties are missing
      this.config = {
        x: config.x || 20,
        y: config.y || 360,
        width: config.width || 760,
        height: config.height || 80,
        boxColor: config.boxColor || 0xc77dff,
        borderColor: config.borderColor || 0x9d4edd,
        padding: config.padding || { x: 10, y: 5 },
        font: config.font || '18px monospace',
        fontFill: config.fontFill || '#ffffff'
      };
  
      // create the dialog box graphics
      this.dialogBox = scene.add.graphics();
      this.dialogBox.setVisible(false);
      this.drawDialogBox();
  
      // create the text element for the dialog
      this.dialogText = scene.add.text(
        this.config.x + this.config.padding.x,
        this.config.y + this.config.padding.y,
        '',
        {
          font: this.config.font,
          fill: this.config.fontFill,
          wordWrap: { width: this.config.width - this.config.padding.x * 2 }
        }
      );
      this.dialogText.setVisible(false);

      this.enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.enterKey.on('down', this.handleEnter, this);
    }
  
    /**
     * draws the dialog box using the current configuration.
     */
    drawDialogBox() {
      const { x, y, width, height, boxColor, borderColor } = this.config;
      this.dialogBox.clear();

      // draw the filled rounded rectangle
      this.dialogBox.fillStyle(boxColor, 0.6);
      this.dialogBox.fillRoundedRect(x, y, width, height, 12);

      // draw the border rounded rectangle
      this.dialogBox.lineStyle(3, borderColor, 1);
      this.dialogBox.strokeRoundedRect(x, y, width, height, 12);
    }
  
    /**
     * starts the dialog with the given lines.
     * @param {Array<string>} lines - an array of strings containing the dialog lines.
     */
    start(lines) {
      this.dialogLines = lines;
      this.currentLineIndex = 0;
      this.dialogBox.setVisible(true);
      this.dialogText.setVisible(true);
      this.startTypingLine();
    }
  
    /**
     * begins the typing effect for the current dialog line.
     */
    startTypingLine() {
      // if a previous typing event exists, remove it
      if (this.typingEvent) {
        this.typingEvent.remove(false);
      }
      this.dialogTyping = true;
      this.currentCharIndex = 0;
      const line = this.dialogLines[this.currentLineIndex];
      this.dialogText.setText('');
      
      // create a loop timer for the typing effect
      this.typingEvent = this.scene.time.addEvent({
        delay: 20, // adjust delay for typing speed
        loop: true,
        callback: () => {
          if (this.currentCharIndex < line.length) {
            this.dialogText.setText(this.dialogText.text + line[this.currentCharIndex]);
            this.currentCharIndex++;
          } else {
            // done typing this line
            this.dialogTyping = false;
            if (this.typingEvent) {
              this.typingEvent.remove(false);
              this.typingEvent = null;
            }
          }
        }
      });
    }
  
    /**
     * instantly completes the current dialog line.
     */
    completeLine() {
      const line = this.dialogLines[this.currentLineIndex];
      this.dialogText.setText(line);
      this.dialogTyping = false;
      if (this.typingEvent) {
        this.typingEvent.remove(false);
        this.typingEvent = null;
      }
    }
  
    /**
     * advances the dialog to the next line. if there are no more lines, it ends the dialog.
     */
    advance() {
      this.currentLineIndex++;
      if (this.currentLineIndex >= this.dialogLines.length) {
        this.end();
      } else {
        this.startTypingLine();
      }
    }
  
    /**
     * ends the dialog and hides the dialog box and text.
     */
    end() {
      this.dialogBox.setVisible(false);
      this.dialogText.setVisible(false);
    }

    handleEnter() {
      // only handle input if the dialog box is visible
      if (!this.dialogBox.visible) return;
      
      if (this.dialogTyping) {
        // if still typing, complete the line
        this.completeLine();
      } else {
        // otherwise, move to the next line or end the dialog
        this.advance();
      }
    }
}