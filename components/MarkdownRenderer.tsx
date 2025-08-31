
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const renderBoldText = (text: string): React.ReactNode => {
  if (!text) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-cyan-400">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');

  let inTable = false;
  const renderedElements: React.ReactNode[] = [];
  let tableRows: React.ReactNode[] = [];
  let tableHeaders: string[] = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      renderedElements.push(
        <div key={`table-wrapper-${renderedElements.length}`} className="overflow-x-auto my-4">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-800">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} scope="col" className="p-3 font-semibold border border-gray-700 text-gray-200">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      );
    }
    inTable = false;
    tableRows = [];
    tableHeaders = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line.startsWith('|') && inTable) {
        flushTable();
    }

    if (line.startsWith('## ')) {
      renderedElements.push(
        <h2 key={i} className="text-2xl font-bold text-cyan-400 border-b border-gray-700 pb-2 mb-4 mt-6">
          {line.substring(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      renderedElements.push(<h3 key={i} className="text-xl font-semibold text-gray-200 mt-6 mb-3">{line.substring(4)}</h3>);
    } else if (line.startsWith('#### ')) {
      renderedElements.push(<h4 key={i} className="text-lg font-semibold text-gray-300 mt-4 mb-2">{line.substring(5)}</h4>);
    } else if (line.startsWith('* ')) {
      renderedElements.push(<li key={i} className="ml-5 list-disc text-gray-300">{renderBoldText(line.substring(2))}</li>);
    } else if (line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).slice(1, -1);
      if (!inTable) { // This is the header row
        inTable = true;
        tableHeaders = cells;
      } else if (!line.includes('---')) { // This is a data row
        tableRows.push(
          <tr key={`tr-${i}`} className="bg-gray-900 hover:bg-gray-800/50 transition-colors">
            {cells.map((cell, index) => {
              const isPriceColumn = (tableHeaders[index] || '').includes('가격');
              const isTotalRow = cell.includes('총 예상 가격');
              const cellClasses = `p-3 border border-gray-700 align-top ${isTotalRow ? 'font-bold text-cyan-400' : 'text-gray-300'}`;
              return (
                <td key={index} className={cellClasses} style={{ whiteSpace: 'pre-wrap', minWidth: isPriceColumn ? '120px' : '150px' }}>
                  {renderBoldText(cell)}
                </td>
              );
            })}
          </tr>
        );
      }
    } else {
      if (line.trim().length > 0) {
        renderedElements.push(<p key={i} className="text-gray-300 my-2">{renderBoldText(line)}</p>);
      }
    }
  }

  if (inTable) { // Flush any remaining table
      flushTable();
  }

  return <div className="prose-custom">{renderedElements}</div>;
};
