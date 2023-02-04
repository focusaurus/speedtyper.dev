import { AnimatePresence, motion } from "framer-motion";
import { CrownIcon } from "../../../../../assets/icons/CrownIcon";
import {
  RacePlayer,
  useGameStore,
  useIsMultiplayer,
} from "../../../state/game-store";

export function ProgressContainer() {
  const members = useGameStore((state) => state.members);
  return (
    <div className="my-2">
      {Object.values(members).map((player) => {
        return <ProgressBar key={player.id} player={player} />;
      })}
    </div>
  );
}

interface ProgressBarProps {
  player: RacePlayer;
}

interface ProgressProps {
  progress: Number;
  word: string;
}

export function Progress({ progress, word }: ProgressProps) {
  return (
    <div
      className="w-full bg-white rounded-lg flex items-center"
      style={{
        height: "4px",
      }}
    >
      <div
        className="bg-purple-300 h-full rounded-lg"
        style={{ width: `${progress}%`, transition: "width 200ms ease-in-out" }}
      ></div>
      {word && (
        <span className="font-semibold text-xs rounded-lg px-2 py-1 bg-gray-700">
          {word}
        </span>
      )}
    </div>
  );
}

export function ProgressBar({ player }: ProgressBarProps) {
  const isMultiplayer = useIsMultiplayer();
  const ownerId = useGameStore.getState().owner;
  const isOwner = ownerId === player.id;
  return isMultiplayer ? (
    <div className="flex row w-full items-center bg-dark-lake rounded-lg px-3 py-2 my-2">
      <span className="flex w-48 ml-1 mr-4 text-sm font-semibold truncate">
        {player.username}
        {isOwner ? (
          <div className="ml-1">
            <CrownIcon />
          </div>
        ) : null}
      </span>
      <Progress progress={player.progress} word={player.recentlyTypedLiteral} />
    </div>
  ) : null;
}

export function PlayHeader() {
  return (
    <div className="w-full relative">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <ProgressContainer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
