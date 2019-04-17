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
    $srcPath = '/files/' . $this->settings->get()['settings']->docPath . '/' . $name . '/';
    return ['text' => $content, 'srcPath' => $srcPath];
  }

  private function getReadmeId($folder) {
    foreach ($folder->getDirectoryListing() as $node) {
      if ($node->getName() == 'README.md') {
        return $node->getId();
      }
    }
    return null;
  }
}