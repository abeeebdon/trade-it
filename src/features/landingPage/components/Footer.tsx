import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-[#1A7A6E]/15 py-10">
      <div className="max-w-350 mx-auto px-6 lg:px-10 text-center">
        <div className="text-[12px] text-[#9CA3AF]">
          Jomp Shop — Connecting Africa to the World, One Trade at a Time
        </div>
        <div className="text-[11px] text-[#1A7A6E] font-mono tracking-widest mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1">
          <span>RIBY INC</span>
          <span>·</span>
          <span>JOMPSTART DIGITAL LIMITED</span>
          <span>·</span>
          <span>ANCHOR</span>
        </div>
        <div className="text-[10px] text-[#6b7280] mt-6 max-w-2xl mx-auto leading-relaxed italic">
          Riby Inc and JompStart Digital Limited are DobbleHelix Limited
          companies (
          <Link
            href="https://dobblehelix.com"
            className="text-[#9CA3AF] hover:text-[#C9922A]"
            target="_blank"
            rel="noopener noreferrer"
          >
            dobblehelix.com
          </Link>{' '}
          · also known as BusinessLab Africa).
        </div>
      </div>
    </footer>
  );
};

export default Footer;
