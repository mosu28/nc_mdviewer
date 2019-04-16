<?php
namespace OCA\MdViewer\Service;

use OCP\Files\IRootFolder;
use OCP\Files\Folder;

use OCA\MdViewer\Service\SettingsService;

class MdService {
  private $root;
  private $settings;
  private $appName;
  private $userId;

  public function __construct(IRootFolder $root, SettingsService $settings, string $appName, string $userId) {
    $this->root = $root;
    $this->settings = $settings;
    $this->appName = $appName;
    $this->userId = $userId;
  }

  public function getAll() {
    $data = ['files' => []];
    $path = '/' . $this->userId . '/files/' . $this->settings->get()['settings']->docPath;
    $folder = $this->root->get($path);
    foreach ($folder->getDirectoryListing() as $node) {
      $data['files'][] = [
        'name' => $node->getName()
      ];
    }
    return $data;
  }

  public function getMd($name) {
    $path = '/' . $this->userId . '/files/' . $this->settings->get()['settings']->docPath . '/' . $name;
    $folder = $this->root->get($path);
    $id = $this->getReadmeId($folder);
    $content = $folder->getById($id)[0]->getContent();
    $srcs = $this->getSrcs($path);
    return ['text' => $content, 'srcs' => $srcs];
  }

  private function getReadmeId($folder) {
    foreach ($folder->getDirectoryListing() as $node) {
      if ($node->getName() == 'README.md') {
        return $node->getId();
      }
    }
    return null;
  }

  private function getSrcs($path) {
    $srcs = [];
    $imagePath = $path . '/images/';
    if (!$this->root->nodeExists($imagePath)) return [];
    $folder = $this->root->get($imagePath);
    foreach ($folder->getDirectoryListing() as $node) {
      $id = $node->getId();
      $name = $node->getName();
      $binary = $folder->getById($id)[0]->getContent();
      $srcs[$name] = base64_encode($binary);
    }
    return $srcs;
  }
}