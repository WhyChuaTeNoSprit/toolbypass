(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const input = $("urlInput");
  const panel = $("resultPanel");

  function showAnalysis() {
    try {
      const data = LinkAnalyzer.analyzeUrl(input.value);
      $("hostValue").textContent = data.hostname;
      $("protocolValue").textContent = data.protocol;
      $("pathValue").textContent = data.pathname;
      $("queryValue").textContent = data.search;
      $("normalizedValue").textContent = data.normalized;
      $("summary").textContent = "Đã phân tích cấu trúc URL ở ngay trên trình duyệt. Không có yêu cầu mạng nào được gửi.";
      $("warnings").replaceChildren();
      data.warnings.forEach((warning, i) => {
        const item = document.createElement("div");
        item.className = i === data.warnings.length - 1 && data.warnings.length === 1 ? "ok-item" : "warning-item";
        item.textContent = warning;
        $("warnings").appendChild(item);
      });
      panel.hidden = false;
    } catch (error) {
      panel.hidden = false;
      $("summary").textContent = error.message || "Không thể phân tích URL.";
      ["hostValue", "protocolValue", "pathValue", "queryValue", "normalizedValue"].forEach(id => $(id).textContent = "—");
      $("warnings").replaceChildren();
    }
  }

  $("analyzeBtn").addEventListener("click", showAnalysis);
  input.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") showAnalysis();
  });
  $("clearBtn").addEventListener("click", () => {
    input.value = "";
    panel.hidden = true;
    input.focus();
  });
  $("copyBtn").addEventListener("click", async () => {
    const text = $("normalizedValue").textContent;
    if (!text || text === "—") return;
    try {
      await navigator.clipboard.writeText(text);
      $("copyBtn").textContent = "Đã sao chép";
      setTimeout(() => $("copyBtn").textContent = "Sao chép URL chuẩn hóa", 1400);
    } catch (_) {
      $("copyBtn").textContent = "Không sao chép được — hãy chọn URL và copy thủ công";
    }
  });
  $("chainBtn").addEventListener("click", () => {
    const list = $("chainResult");
    list.replaceChildren();
    const items = LinkAnalyzer.parseChain($("chainInput").value);
    if (!items.length) {
      const li = document.createElement("li");
      li.textContent = "Hãy dán ít nhất một URL, mỗi URL trên một dòng.";
      list.appendChild(li);
      return;
    }
    items.forEach(item => {
      const li = document.createElement("li");
      if (!item.valid) {
        li.className = "invalid";
        li.textContent = item.index + ". " + item.value + " — " + item.error;
      } else {
        const label = document.createElement("span");
        label.textContent = item.index + ". ";
        const link = document.createElement("a");
        link.href = item.value;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.host + " — " + item.value;
        li.append(label, link);
      }
      list.appendChild(li);
    });
  });
})();
