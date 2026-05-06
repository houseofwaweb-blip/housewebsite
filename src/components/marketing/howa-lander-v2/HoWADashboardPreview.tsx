import {
  Calendar,
  ListChecks,
  Activity,
  ShieldCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import s from "./howa-lander-v2.module.css";

/**
 * Stylised dashboard preview block. Brief mandates: "Show living home
 * record (tasks, alerts, design projects, protection records, service
 * continuity)." Real product screens go in here once Alex provides them
 * — the structure is built so a single image swap will replace the
 * placeholder grid without rebuilding the section.
 */
export function HoWADashboardPreview() {
  return (
    <section className={s.dashSection} aria-label="Dashboard preview">
      <header className={s.dashHead}>
        <p className={s.dashEy}>The living home record</p>
        <h2 className={s.dashTitle}>
          Everything your home <em>remembers.</em>
        </h2>
        <p className={s.dashSub}>
          Tasks, alerts, design projects, protection records, service history —
          one calm shell. Free is a real product, not a teaser.
        </p>
      </header>

      <div className={s.dashFrame}>
        <div className={s.dashFrameTop}>
          <div className={s.dashFrameDots}>
            <span /><span /><span />
          </div>
          <div className={s.dashFrameAddress}>
            House № 1892 · Living record · synced today
          </div>
        </div>

        <div className={s.dashGrid}>
          <article className={s.dashTile}>
            <header className={s.dashTileHead}>
              <span className={s.dashIcon}><Calendar size={16} strokeWidth={1.6} /></span>
              <p className={s.dashTileLabel}>This week</p>
            </header>
            <ul className={s.dashList}>
              <li>
                <span>Boiler · Friday</span>
                <em>booked</em>
              </li>
              <li>
                <span>Gutters · 7 May</span>
                <em>scheduled</em>
              </li>
              <li>
                <span>Roof inspection</span>
                <em>quoted</em>
              </li>
            </ul>
          </article>

          <article className={s.dashTile}>
            <header className={s.dashTileHead}>
              <span className={s.dashIcon}><Activity size={16} strokeWidth={1.6} /></span>
              <p className={s.dashTileLabel}>House Health</p>
            </header>
            <p className={s.dashHealth}>A−</p>
            <p className={s.dashHealthSub}>2 open alerts · 14 records</p>
          </article>

          <article className={s.dashTile}>
            <header className={s.dashTileHead}>
              <span className={s.dashIcon}><ListChecks size={16} strokeWidth={1.6} /></span>
              <p className={s.dashTileLabel}>Open alerts</p>
            </header>
            <ul className={s.dashList}>
              <li><span>Boiler · 14 days</span><em>plan</em></li>
              <li><span>Roof · seasonal</span><em>review</em></li>
            </ul>
          </article>

          <article className={s.dashTile}>
            <header className={s.dashTileHead}>
              <span className={s.dashIcon}><FileText size={16} strokeWidth={1.6} /></span>
              <p className={s.dashTileLabel}>Records · 30 days</p>
            </header>
            <ul className={s.dashList}>
              <li><span>Boiler — annual service</span><em>06 Apr</em></li>
              <li><span>Garden — spring planting</span><em>14 Apr</em></li>
              <li><span>Insurance — renewal saved</span><em>21 Apr</em></li>
            </ul>
          </article>

          <article className={s.dashTile}>
            <header className={s.dashTileHead}>
              <span className={s.dashIcon}><ShieldCheck size={16} strokeWidth={1.6} /></span>
              <p className={s.dashTileLabel}>Protection</p>
            </header>
            <ul className={s.dashList}>
              <li><span>Buildings &amp; contents</span><em>under review</em></li>
              <li><span>Boiler cover</span><em>active</em></li>
            </ul>
          </article>

          <article className={`${s.dashTile} ${s.dashTileFeature}`}>
            <header className={s.dashTileHead}>
              <span className={s.dashIcon}><TrendingUp size={16} strokeWidth={1.6} /></span>
              <p className={s.dashTileLabel}>This year</p>
            </header>
            <p className={s.dashFeatureBig}>£1,840</p>
            <p className={s.dashHealthSub}>estimated saved · vs. failure-replacement</p>
          </article>
        </div>
      </div>

      <p className={s.dashFootnote}>
        Placeholder UI · final screens replace this on launch.
      </p>
    </section>
  );
}
