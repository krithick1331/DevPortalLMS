export default function PDFViewer({ pdfUrl }) {
    return (
        <div className="h-full w-full">
            <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="Study Material"
            />
        </div>
    );
}