#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::command;

#[command]
async fn open_profile(profile_no: String) -> Result<String, String> {
    let client = reqwest::Client::new();

    let response = client
        .post("http://local.adspower.net:50325/api/v2/browser-profile/start")
        .header(
            "Authorization",
            "Bearer cdc9e17251d5c383f8c56a00967dbe6a0083e482b6f6c9d6",
        )
        .json(&serde_json::json!({
            "profile_no": profile_no
        }))
        .send()
        .await;

    match response {
        Ok(res) => {
            let text = res.text().await.unwrap_or_default();
            Ok(text)
        }
        Err(e) => Err(e.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_profile])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}