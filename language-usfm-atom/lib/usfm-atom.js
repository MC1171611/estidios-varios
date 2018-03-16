'use babel';

import UsfmAtomView from './usfm-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  usfmAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.usfmAtomView = new UsfmAtomView(state.usfmAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.usfmAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'usfm-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.usfmAtomView.destroy();
  },

  serialize() {
    return {
      usfmAtomViewState: this.usfmAtomView.serialize()
    };
  },

  toggle() {
    console.log('UsfmAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
