import os
import json

import nlpcloud

from dotenv import load_dotenv

from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter

load_dotenv()

API_KEY = os.getenv("API_KEY")

client = nlpcloud.Client("bart-large-cnn", API_KEY, gpu=True)


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            post_body = json.loads(self.rfile.read(content_len))

            summarized_text = client.summarization(
                json.dumps({"text": post_body.get("text")}))

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(
                {"data": summarized_text.get("summary_text")}).encode("utf-8"))
            return
        except Exception as err:
            print(err)
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(
                {"message": "Server Error"}).encode("utf-8"))

        return

    def do_GET(self):
        try:
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            video_id = query_params["video_id"][0]
            transcript = self._get_video_transcript(video_id)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"data": transcript}).encode("utf-8"))
            return
        except Exception:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(
                {"message": "Server Error"}).encode("utf-8"))
        return

    def _get_video_transcript(self, video_id):
        transcript = YouTubeTranscriptApi.get_transcript(
            video_id, preserve_formatting=True)

        formatter = TextFormatter()

        text_formatter = formatter.format_transcript(transcript)

        return text_formatter
