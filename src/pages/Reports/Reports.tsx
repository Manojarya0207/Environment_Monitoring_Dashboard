import { FileText, Download, Filter, Calendar } from "lucide-react";

const reports = [
  { id: 1, name: "Daily Generation Summary", date: "2026-07-03", type: "PDF", size: "2.4 MB" },
  { id: 2, name: "Weekly Wind Analysis", date: "2026-07-01", type: "Excel", size: "5.1 MB" },
  { id: 3, name: "Monthly Efficiency Report", date: "2026-06-30", type: "PDF", size: "3.8 MB" },
  { id: 4, name: "Weather Correlation Raw Data", date: "2026-06-30", type: "CSV", size: "12.5 MB" },
  { id: 5, name: "Maintenance Log Q2", date: "2026-06-15", type: "PDF", size: "1.2 MB" },
];

export function Reports() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reports & Exports</h1>
          <p className="text-muted-foreground">Download historical data, analytics, and operational reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <FileText className="w-4 h-4" /> Generate New
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-muted-foreground text-sm">
                <th className="p-4 font-medium">Report Name</th>
                <th className="p-4 font-medium">Date Generated</th>
                <th className="p-4 font-medium">Format</th>
                <th className="p-4 font-medium">Size</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{report.name}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10">
                      {report.type}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{report.size}</td>
                  <td className="p-4">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
