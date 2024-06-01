import TabsComponent from "../components/TabsComponent";
import AppDiffEditorComponent from "../components/AppDiffEditorComponent";

function DiffEditorWrapper() {
  return (
    <div className="content-container">
      <main className="p-3 h-100 w-100 bg-white">
        <AppDiffEditorComponent />
      </main>
    </div>
  );
}

export default DiffEditorWrapper;
