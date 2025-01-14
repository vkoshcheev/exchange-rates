import { legalNote } from './legalNoteText';
import './LegalNote.scss';

const LegalNote = () => {
  return <div className="section legal-note-text">{legalNote}</div>;
};

export default LegalNote;
