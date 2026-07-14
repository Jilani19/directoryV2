import React, { useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, CsvExportModule, ValidationModule } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, ValidationModule]);
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Company } from "../services/company.service";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface AGGridTableProps {
  companies: Company[];
}

export function AGGridTable({ companies }: AGGridTableProps) {
  const gridRef = useRef<AgGridReact>(null);
  const router = useRouter();

  const columnDefs = useMemo(() => [
    { 
      field: "name", 
      headerName: "Company Name", 
      filter: true, 
      sortable: true,
      pinned: "left",
      cellRenderer: (params: import('ag-grid-community').ICellRendererParams) => {
        return (
          <div className="flex items-center gap-2 h-full cursor-pointer hover:text-indigo-600 font-bold" onClick={() => router.push(`/directory/${params.data.slug}/overview`)}>
            {params.data.verified && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
            {params.value}
          </div>
        );
      }
    },
    { field: "category", headerName: "Category", filter: true, sortable: true },
    { field: "industry", headerName: "Industry", filter: true, sortable: true },
    { field: "country", headerName: "Country", filter: true, sortable: true },
    { field: "city", headerName: "City", filter: true, sortable: true },
    { field: "employees", headerName: "Employees", filter: true, sortable: true },
    { field: "rating", headerName: "Rating", filter: "agNumberColumnFilter", sortable: true },
    { 
      field: "certifications", 
      headerName: "Certifications", 
      filter: true,
      cellRenderer: (params: import('ag-grid-community').ICellRendererParams) => {
        const certs = params.value || [];
        return certs.join(", ");
      }
    },
  ], [router]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
  }), []);

  const onExportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, []);

  return (
    <div className="flex flex-col w-full h-[600px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 dark:text-white">AG Grid Enterprise View</h3>
        <button 
          onClick={onExportCsv}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>
      <div className="ag-theme-alpine dark:ag-theme-alpine-dark w-full h-full rounded-xl overflow-hidden">
        <AgGridReact
          ref={gridRef}
          rowData={companies}
          columnDefs={columnDefs as import('ag-grid-community').ColDef[]}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={12}
          domLayout="normal"
        />
      </div>
    </div>
  );
}
