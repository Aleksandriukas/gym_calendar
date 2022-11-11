#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "macos"
)]

use std::{fs};


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn create_directory(){
    fs::create_dir(MAIN_DIRECTORY_NAME);
}

pub fn path_exists(path: &str) -> bool {
    fs::metadata(path).is_ok()
}


static MAIN_DIRECTORY_NAME: &str = "week_plans";
fn main() {
    
    if(!path_exists(MAIN_DIRECTORY_NAME)){
        create_directory();
    }
  
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
