import React, { useState } from 'react';
import { 
  orderGameCards, 
  characterMatchPairs, 
  moralMissionScenarios, 
  TimelineCard 
} from '../../data/gameData';
import { 
  Gamepad2, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  HeartHandshake, 
  Award, 
  Check, 
  AlertCircle,
  HelpCircle,
  Layers,
  Users2,
  Smile
} from 'lucide-react';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface GameCenterProps {
  onCompleteGame: (gameKey: 'orderGame' | 'characterMatch' | 'valueMission', stars: number) => void;
  gameStatus: {
    orderGame: boolean;
    characterMatch: boolean;
    valueMission: boolean;
  };
}

export const GameCenter: React.FC<GameCenterProps> = ({
  onCompleteGame,
  gameStatus
}) => {
  const [activeTab, setActiveTab] = useState<'order' | 'match' | 'mission'>('order');

  // ---------------- GAME A: SUSUN URUTAN STATE ----------------
  // Initial shuffle
  const [timelineItems, setTimelineItems] = useState<TimelineCard[]>(() => {
    return [...orderGameCards].sort(() => Math.random() - 0.5);
  });
  const [orderChecked, setOrderChecked] = useState(false);
  const [orderScore, setOrderScore] = useState<number | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    sounds.playClick();
    const newItems = [...timelineItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setTimelineItems(newItems);
    setOrderChecked(false);
  };

  const checkOrderSolution = () => {
    sounds.playClick();
    let correctCount = 0;
    timelineItems.forEach((item, idx) => {
      if (item.orderCorrect === idx + 1) {
        correctCount++;
      }
    });

    setOrderScore(correctCount);
    setOrderChecked(true);

    if (correctCount === 6) {
      sounds.playCelebration();
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
      onCompleteGame('orderGame', 10);
    } else {
      sounds.playGentleHint();
    }
  };

  const resetOrderGame = () => {
    sounds.playClick();
    setTimelineItems([...orderGameCards].sort(() => Math.random() - 0.5));
    setOrderChecked(false);
    setOrderScore(null);
  };

  // ---------------- GAME B: PASANGKAN TOKOH STATE ----------------
  // Left: Character names, Right: Shuffled Roles
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [userMatches, setUserMatches] = useState<Record<string, string>>({}); // charId -> roleId
  const [matchChecked, setMatchChecked] = useState(false);
  const [shuffledRoles] = useState(() => {
    return [...characterMatchPairs].map(p => ({ id: p.id, role: p.role })).sort(() => Math.random() - 0.5);
  });

  const handleSelectChar = (id: string) => {
    sounds.playClick();
    setSelectedCharId(id);
    if (selectedRoleId) {
      // Connect
      setUserMatches(prev => ({ ...prev, [id]: selectedRoleId }));
      setSelectedCharId(null);
      setSelectedRoleId(null);
    }
  };

  const handleSelectRole = (id: string) => {
    sounds.playClick();
    setSelectedRoleId(id);
    if (selectedCharId) {
      // Connect
      setUserMatches(prev => ({ ...prev, [selectedCharId]: id }));
      setSelectedCharId(null);
      setSelectedRoleId(null);
    }
  };

  const checkMatchSolution = () => {
    sounds.playClick();
    let correct = 0;
    characterMatchPairs.forEach(pair => {
      if (userMatches[pair.id] === pair.id) {
        correct++;
      }
    });

    setMatchChecked(true);
    if (correct === characterMatchPairs.length) {
      sounds.playCelebration();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {}
      onCompleteGame('characterMatch', 10);
    } else {
      sounds.playGentleHint();
    }
  };

  const resetMatchGame = () => {
    sounds.playClick();
    setUserMatches({});
    setSelectedCharId(null);
    setSelectedRoleId(null);
    setMatchChecked(false);
  };

  // ---------------- GAME C: MISI NILAI HIJRAH STATE ----------------
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, number>>({});
  const [missionComplete, setMissionComplete] = useState(false);

  const scenario = moralMissionScenarios[currentScenarioIdx];
  const answeredChoice = scenarioAnswers[scenario.id];

  const handleSelectMissionOption = (choiceIdx: number) => {
    sounds.playClick();
    setScenarioAnswers(prev => ({ ...prev, [scenario.id]: choiceIdx }));
    const opt = scenario.options[choiceIdx];
    if (opt.isBestChoice) {
      sounds.playCorrect();
    } else {
      sounds.playGentleHint();
    }
  };

  const handleNextMission = () => {
    sounds.playClick();
    if (currentScenarioIdx < moralMissionScenarios.length - 1) {
      setCurrentScenarioIdx(prev => prev + 1);
    } else {
      setMissionComplete(true);
      sounds.playCelebration();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
      onCompleteGame('valueMission', 10);
    }
  };

  const resetMissionGame = () => {
    sounds.playClick();
    setCurrentScenarioIdx(0);
    setScenarioAnswers({});
    setMissionComplete(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="bg-purple-100/70 p-5 rounded-3xl border-2 border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-900 mb-1">
            <Gamepad2 className="w-4 h-4 text-purple-700" />
            <span>Zona Permainan Edukatif (Gamifikasi Pembelajaran)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Game Hijrah Adventure
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Mainkan 3 game seru, latih ketelitianmu, dan raih bintang kebaikan tanpa rasa takut salah!
          </p>
        </div>

        {/* Global badges */}
        <div className="flex items-center gap-2 bg-white/90 px-3.5 py-2 rounded-2xl border border-purple-300 shadow-2xs self-start sm:self-auto">
          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="text-xs font-bold text-stone-800">
            Tersedia 30 Bintang Kebaikan
          </span>
        </div>
      </div>

      {/* GAME TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => { sounds.playClick(); setActiveTab('order'); }}
          className={`p-4 rounded-3xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
            activeTab === 'order'
              ? 'border-purple-600 bg-purple-700 text-white shadow-lg'
              : 'border-amber-200 bg-white hover:bg-purple-50 text-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase opacity-80 mb-0.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Game A</span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base">Susun Urutan Peristiwa</h4>
            <p className="text-xs opacity-80 mt-0.5">Urutkan 6 tahapan hijrah secara runtut</p>
          </div>
          {gameStatus.orderGame && <CheckCircle2 className={`w-5 h-5 ${activeTab === 'order' ? 'text-amber-300' : 'text-emerald-600'}`} />}
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('match'); }}
          className={`p-4 rounded-3xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
            activeTab === 'match'
              ? 'border-purple-600 bg-purple-700 text-white shadow-lg'
              : 'border-amber-200 bg-white hover:bg-purple-50 text-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase opacity-80 mb-0.5">
              <Users2 className="w-3.5 h-3.5" />
              <span>Game B</span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base">Pasangkan Tokoh & Peran</h4>
            <p className="text-xs opacity-80 mt-0.5">Cocokkan 7 nama dengan tugas mulianya</p>
          </div>
          {gameStatus.characterMatch && <CheckCircle2 className={`w-5 h-5 ${activeTab === 'match' ? 'text-amber-300' : 'text-emerald-600'}`} />}
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('mission'); }}
          className={`p-4 rounded-3xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
            activeTab === 'mission'
              ? 'border-purple-600 bg-purple-700 text-white shadow-lg'
              : 'border-amber-200 bg-white hover:bg-purple-50 text-stone-700'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase opacity-80 mb-0.5">
              <Smile className="w-3.5 h-3.5" />
              <span>Game C</span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base">Misi Nilai Hijrah</h4>
            <p className="text-xs opacity-80 mt-0.5">Pilih sikap bijak dalam kehidupan sehari-hari</p>
          </div>
          {gameStatus.valueMission && <CheckCircle2 className={`w-5 h-5 ${activeTab === 'mission' ? 'text-amber-300' : 'text-emerald-600'}`} />}
        </button>
      </div>

      {/* ======================= TAB 1: GAME A ======================= */}
      {activeTab === 'order' && (
        <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">Susun 6 Kartu Peristiwa Hijrah</h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Gunakan tombol panah <strong>Naik (▲)</strong> dan <strong>Turun (▼)</strong> di setiap kartu untuk menyusun urutan peristiwa dari yang paling awal hingga akhir.
              </p>
            </div>
            <button
              onClick={resetOrderGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Acak Ulang Kartu</span>
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {timelineItems.map((item, index) => {
              const isCorrectPosition = orderChecked && item.orderCorrect === index + 1;
              const isWrongPosition = orderChecked && item.orderCorrect !== index + 1;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ${
                    isCorrectPosition
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                      : isWrongPosition
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-700 text-white font-black text-sm flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-black text-stone-900 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-xs text-stone-600 mt-0.5">{item.shortDesc}</p>
                    </div>
                  </div>

                  {/* Up / Down Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-700 transition cursor-pointer"
                      title="Pindahkan ke atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === timelineItems.length - 1}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-700 transition cursor-pointer"
                      title="Pindahkan ke bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Actions */}
          <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {orderChecked && (
                <div className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold ${
                  orderScore === 6
                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                    : 'bg-amber-100 border border-amber-300 text-amber-900'
                }`}>
                  {orderScore === 6 ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>Luar biasa! 6 urutan peristiwa hijrah tersusun tepat dengan sempurna! (+10 Bintang)</span>
                    </span>
                  ) : (
                    <span>Kamu berhasil menempatkan {orderScore} dari 6 kartu pada posisi tepat. Yuk periksa kembali dan coba geser posisinya!</span>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={checkOrderSolution}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-extrabold text-sm shadow-md transition cursor-pointer"
            >
              Periksa Jawaban Urutan
            </button>
          </div>
        </div>
      )}

      {/* ======================= TAB 2: GAME B ======================= */}
      {activeTab === 'match' && (
        <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">Pasangkan Tokoh & Peran Mulianya</h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Pilih nama tokoh di kolom kiri, lalu pilih kotak peran yang cocok di kolom kanan.
              </p>
            </div>
            <button
              onClick={resetMatchGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Game</span>
            </button>
          </div>

          {/* Dual columns matching */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Characters */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 mb-2">Nama Tokoh & Golongan:</h4>
              {characterMatchPairs.map((pair) => {
                const isSelected = selectedCharId === pair.id;
                const matchedRoleId = userMatches[pair.id];
                const isCorrect = matchChecked && matchedRoleId === pair.id;
                const isWrong = matchChecked && matchedRoleId && matchedRoleId !== pair.id;

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleSelectChar(pair.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-100 text-purple-950 font-black shadow-md'
                        : isCorrect
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                        : isWrong
                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                        : matchedRoleId
                        ? 'border-amber-300 bg-amber-50 text-stone-800 font-bold'
                        : 'border-stone-200 bg-stone-50 hover:border-purple-300 text-stone-700'
                    }`}
                  >
                    <span className="text-xs sm:text-sm">{pair.name}</span>
                    {matchedRoleId && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-200">
                        {isCorrect ? '✓ Cocok' : 'Terhubung'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Roles */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 mb-2">Tugas / Peran Bersejarah:</h4>
              {shuffledRoles.map((roleItem) => {
                const isSelected = selectedRoleId === roleItem.id;
                const connectedCharId = Object.keys(userMatches).find(k => userMatches[k] === roleItem.id);

                return (
                  <button
                    key={roleItem.id}
                    onClick={() => handleSelectRole(roleItem.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-purple-600 bg-purple-100 text-purple-950 font-black shadow-md'
                        : connectedCharId
                        ? 'border-amber-300 bg-amber-50 text-stone-800 font-medium'
                        : 'border-stone-200 bg-stone-50 hover:border-purple-300 text-stone-700'
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{roleItem.role}</p>
                    {connectedCharId && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                        Dipasangkan ke: {characterMatchPairs.find(p => p.id === connectedCharId)?.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Actions */}
          <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {matchChecked && (
                <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3.5 rounded-2xl text-xs sm:text-sm font-semibold">
                  Hebat! Kamu telah menyelesaikan permainan mencocokkan tokoh dengan penuh semangat.
                </div>
              )}
            </div>
            <button
              onClick={checkMatchSolution}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-extrabold text-sm shadow-md transition cursor-pointer"
            >
              Periksa Pasangan
            </button>
          </div>
        </div>
      )}

      {/* ======================= TAB 3: GAME C ======================= */}
      {activeTab === 'mission' && (
        <div className="bg-white rounded-3xl border-3 border-amber-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-800 mb-0.5">
                <Smile className="w-4 h-4 text-purple-600" />
                <span>Misi #{scenario.id} dari {moralMissionScenarios.length}</span>
              </div>
              <h3 className="text-xl font-black text-stone-900">{scenario.title}</h3>
            </div>
            <button
              onClick={resetMissionGame}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mulai Ulang Misi</span>
            </button>
          </div>

          {!missionComplete ? (
            <div className="space-y-5">
              {/* Scenario Story Box */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 space-y-2">
                <span className="text-xs font-bold text-purple-900 block">Situasi Nyata di Sekolah / Rumah:</span>
                <p className="text-sm sm:text-base text-stone-800 font-semibold leading-relaxed">
                  "{scenario.story}"
                </p>
              </div>

              {/* Question */}
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-black text-stone-900">
                  {scenario.question}
                </h4>

                <div className="space-y-2.5">
                  {scenario.options.map((opt, oIdx) => {
                    const isSelected = answeredChoice === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectMissionOption(oIdx)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? opt.isBestChoice
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-md'
                              : 'bg-amber-100 border-amber-400 text-amber-950 font-medium'
                            : 'bg-stone-50 border-stone-200 hover:bg-purple-50/50 hover:border-purple-300 text-stone-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-white border border-stone-300 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback box */}
              {answeredChoice !== undefined && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium animate-in fade-in duration-200 space-y-1.5 ${
                  scenario.options[answeredChoice].isBestChoice
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                    : 'bg-amber-100 border-amber-300 text-amber-900'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Nilai yang Dipelajari: {scenario.options[answeredChoice].valueLearned}</span>
                  </div>
                  <p>{scenario.options[answeredChoice].feedback}</p>
                </div>
              )}

              {/* Next mission step button */}
              <div className="pt-4 border-t border-amber-100 flex justify-end">
                <button
                  onClick={handleNextMission}
                  disabled={answeredChoice === undefined}
                  className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm transition cursor-pointer shadow-md"
                >
                  {currentScenarioIdx < moralMissionScenarios.length - 1 ? 'Lanjut ke Misi Berikutnya' : 'Selesaikan Semua Misi'}
                </button>
              </div>
            </div>
          ) : (
            /* Mission Complete Card */
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-emerald-900">Selamat! Seluruh Misi Kebaikan Tuntas!</h4>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto font-medium">
                Kamu telah membuktikan bahwa nilai luhur hijrah—seperti persaudaraan kaum Ansar, amanah, kejujuran, dan ikhtiar yang sungguh-sungguh—dapat kamu praktikkan langsung di sekolah dan rumah.
              </p>
              <button
                onClick={resetMissionGame}
                className="px-6 py-2.5 rounded-2xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition cursor-pointer shadow-md"
              >
                Mainkan Misi Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
