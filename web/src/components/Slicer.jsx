import { motion } from 'framer-motion';
import { CHANNELS } from '../data/channelData';

export default function Slicer({ active, onChange }) {
  return (
    <div className="slicer">
      <span className="slicer-label">Signup Channel</span>
      {CHANNELS.map((ch) => {
        const isActive = ch === active;
        return (
          <button
            key={ch}
            className={'slicer-opt' + (isActive ? ' active' : '')}
            onClick={() => onChange(ch)}
          >
            {isActive && (
              <motion.span
                layoutId="slicer-pill"
                className="slicer-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span>{ch === 'all' ? 'All' : 'Ch ' + ch}</span>
          </button>
        );
      })}
    </div>
  );
}
