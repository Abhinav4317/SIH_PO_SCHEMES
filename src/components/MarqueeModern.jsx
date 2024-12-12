const MarqueeModern = () => {
  return (
    <div className="w-full bg-[#FFEDD5] overflow-hidden py-4">
      <div className="marquee">
        <ul className="list-node flex space-x-8">
          <li>
            Leh : Post offices to launch ‘Maha Mela’ for account opening drive
            under Post Office Saving Bank Scheme from February 20 to 24.
          </li>
          <li>
            The Ministry of Finance announced on Monday that it has kept the
            savings scheme such as PPF, SSY, NSC, KVP, term deposits, etc.,
            unchanged for third quarter of the ongoing financial year form Oct
            to Dec 2024.
          </li>
          <li>
            PM Modi distributes over 51,000 job offer letters to newly appointed
            youth under Rozgar Mela.
          </li>
          <li>
            {'"'}Dak Chaupal{'"'} to be organized to connect people to various
            Welfare Schemes of the Government - Postmaster General
            Krishna Kumar Yadav
          </li>
        </ul>
      </div>
      <style jsx>{`
        .marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeModern;
