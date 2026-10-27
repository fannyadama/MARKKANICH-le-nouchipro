#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'importation et de décodage des mots Nouchi compacts
Auteur : Markkanich / Adama
"""

import json
import sqlite3
import os

JSON_FILE = 'nouchi_300.json'
DB_FILE = 'dictionnaire_nouchi.db'

COLUMN_MAPPING = {
    "m": "mot",
    "p": "prononciation",
    "d": "definition",
    "e": "exemple",
    "o": "origine",
    "c": "categorie"
}

def import_nouchi_data():
    if not os.path.exists(JSON_FILE):
        print(f"❌ Erreur : Le fichier {JSON_FILE} est introuvable.")
        return

    with open(JSON_FILE, 'r', encoding='utf-8') as file:
        data = json.load(file)

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS mots_nouchi (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mot TEXT UNIQUE NOT NULL,
            prononciation TEXT,
            definition TEXT,
            exemple TEXT,
            origine TEXT,
            categorie TEXT
        )
    ''')

    succes_count = 0
    erreur_count = 0

    for item in data:
        try:
            mot_complet = {
                "mot": item.get("m"),
                "prononciation": item.get("p"),
                "definition": item.get("d"),
                "exemple": item.get("e"),
                "origine": item.get("o"),
                "categorie": item.get("c")
            }

            cursor.execute('''
                INSERT OR IGNORE INTO mots_nouchi 
                (mot, prononciation, definition, exemple, origine, categorie)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                mot_complet["mot"],
                mot_complet["prononciation"],
                mot_complet["definition"],
                mot_complet["exemple"],
                mot_complet["origine"],
                mot_complet["categorie"]
            ))
            
            if cursor.rowcount > 0:
                succes_count += 1
            else:
                erreur_count += 1
                
        except Exception as e:
            print(f"⚠️ Erreur lors de l'insertion de '{item.get('m')}': {e}")
            erreur_count += 1

    conn.commit()
    conn.close()

    print("✅ Importation terminée !")
    print(f"   - Mots ajoutés avec succès : {succes_count}")
    print(f"   - Mots ignorés (doublons) ou en erreur : {erreur_count}")
    print(f"   - Base de données mise à jour : {DB_FILE}")

if __name__ == "__main__":
    import_nouchi_data()
