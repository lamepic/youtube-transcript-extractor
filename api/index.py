import json

from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_url = urlparse(self.path)
        query_params = parse_qs(parsed_url.query)

        video_id = query_params["video_id"][0]

        transcript = self._get_video_transcript(video_id)

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"data": transcript}).encode("utf-8"))
        return

    def _get_video_transcript(self, video_id):
        transcript = YouTubeTranscriptApi.get_transcript(
            video_id, preserve_formatting=True)

        formatter = TextFormatter()

        text_formatter = formatter.format_transcript(transcript)

        return text_formatter
